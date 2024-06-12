import { Context } from 'hono';
import { 
    getAllStatusCatalogsService, 
    getStatusCatalogByIdService, 
    createStatusCatalogService,
    updateStatusCatalogService,
    deleteStatusCatalogService,
    getStatusCatalogByNameService 
} from './status_catalog.service';

// Get all status catalogs
export const getAllStatusCatalogs = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllStatusCatalogsService(limit);
        if (!data || data.length === 0) {
            return c.text("No status catalogs found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get status catalog by ID
export const getStatusCatalogById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const statusCatalog = await getStatusCatalogByIdService(id);
    if (!statusCatalog) {
        return c.text("Status catalog not found", 404);
    }
    return c.json(statusCatalog, 200);
};

// Create a new status catalog
export const createStatusCatalog = async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog = await createStatusCatalogService(statusCatalog);

        if (!createdStatusCatalog) return c.text("Status catalog not created", 404);
        return c.json({ msg: createdStatusCatalog }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update a status catalog by ID
export const updateStatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const statusCatalog = await c.req.json();
    try {
        const searchedStatusCatalog = await getStatusCatalogByIdService(id);
        if (!searchedStatusCatalog) return c.text("Status catalog not found", 404);

        const res = await updateStatusCatalogService(id, statusCatalog);
        if (!res) return c.text("Status catalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete a status catalog by ID
export const deleteStatusCatalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const statusCatalog = await getStatusCatalogByIdService(id);
        if (!statusCatalog) return c.text("Status catalog not found", 404);

        const res = await deleteStatusCatalogService(id);
        if (!res) return c.text("Status catalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get status catalog by name
export const getStatusCatalogByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const statusCatalog = await getStatusCatalogByNameService(name);
    if (!statusCatalog) {
        return c.text("Status catalog not found", 404);
    }
    return c.json(statusCatalog, 200);
};

