import db from "../drizzle/db";
import { TIStatusCatalog, TSStatusCatalog, StatusCatalogTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all status catalogs
export const getAllStatusCatalogsService = async (limit?: number): Promise<TSStatusCatalog[] | null> => {
    if (limit) {
        return await db.query.StatusCatalogTable.findMany({
            limit: limit
        });
    }
    return await db.query.StatusCatalogTable.findMany(
        {
            with: {
                
                //order_statuses: true,
        }}
    );
};

// Get status catalog by ID
export const getStatusCatalogByIdService = async (id: number): Promise<TIStatusCatalog | undefined> => {
    return await db.query.StatusCatalogTable.findFirst({
        where: eq(StatusCatalogTable.id, id)
    });
};

// Create a new status catalog
export const createStatusCatalogService = async (statusCatalog: TIStatusCatalog) => {
    await db.insert(StatusCatalogTable).values(statusCatalog);
    return "Status catalog created successfully";
};

// Update a status catalog by ID
export const updateStatusCatalogService = async (id: number, statusCatalog: TIStatusCatalog) => {
    await db.update(StatusCatalogTable).set(statusCatalog).where(eq(StatusCatalogTable.id, id));
    return "Status catalog updated successfully";
};

// Delete a status catalog by ID
export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(StatusCatalogTable).where(eq(StatusCatalogTable.id, id));
    return "Status catalog deleted successfully";
};

// Get status catalog by name
export const getStatusCatalogByNameService = async (name: string): Promise<TIStatusCatalog | undefined> => {
    return await db.query.StatusCatalogTable.findFirst({
        where: eq(StatusCatalogTable.name, name)
    });
};

