import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDriver, TSDriver, DriverTable } from "../drizzle/schema";

export const getAllDriversService = async (limit?: number): Promise<TSDriver[] | null> => {
    if (limit) {
        return await db.query.DriverTable.findMany({
            limit: limit
        });
    }
    return await db.query.DriverTable.findMany();
}

export const getDriverByIdService = async (id: number): Promise<TIDriver | undefined> => {
    return await db.query.DriverTable.findFirst({
        where: eq(DriverTable.id, id)
    });
}

export const createDriverService = async (driver: TIDriver) => {
    await db.insert(DriverTable).values(driver);
    return "Driver created successfully";
}

export const updateDriverService = async (id: number, driver: TIDriver) => {
    await db.update(DriverTable).set(driver).where(eq(DriverTable.id, id));
    return "Driver updated successfully";
}

export const deleteDriverService = async (id: number) => {
    await db.delete(DriverTable).where(eq(DriverTable.id, id));
    return "Driver deleted successfully";
}

export const getDriverByNameService = async (user_id: string): Promise<TIDriver | undefined> => {
    return await db.query.DriverTable.findFirst({
        where: eq(DriverTable.user_id, parseInt(user_id))
    });
}
