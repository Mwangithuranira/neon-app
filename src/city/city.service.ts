import { eq } from 'drizzle-orm';
import db from '../drizzle/db';
import { TICity, TSCity, CityTable } from '../drizzle/schema';

export const getAllCitiesService = async (limit?: number): Promise<TSCity[] | null> => {
    if (limit) {
        return await db.query.CityTable.findMany({ limit: limit });
    }
    return await db.query.CityTable.findMany(
        {
            with: {
                addresses: true,
                
                state: true
            }
        }
    );
}

export const getCityByIdService = async (id: number): Promise<TICity | undefined> => {
    return await db.query.CityTable.findFirst({
        where: eq(CityTable.id, id)
    });
}

export const createCityService = async (city: TICity) => {
    await db.insert(CityTable).values(city);
    return "City created successfully";
}

export const updateCityService = async (id: number, city: TICity) => {
    await db.update(CityTable).set(city).where(eq(CityTable.id, id));
    return "City updated successfully";
}

export const deleteCityService = async (id: number) => {
    await db.delete(CityTable).where(eq(CityTable.id, id));
    return "City deleted successfully";
}

export const getCityByNameService = async (name: string): Promise<TICity | undefined> => {
    return await db.query.CityTable.findFirst({
        where: eq(CityTable.name, name)
    });
}
