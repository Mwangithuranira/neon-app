import { Context } from 'hono';
import { getAllDriversService, getDriverByIdService, createDriverService, updateDriverService, deleteDriverService, getDriverByNameService } from './driver.service';

export const getAllDrivers = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllDriversService(limit);
        if (data == null || data.length == 0) {
            return c.text("No drivers found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getDriverById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await getDriverByIdService(id);
    if (driver == undefined) {
        return c.text("Driver not found", 404);
    }
    return c.json(driver, 200);
};

export const createDriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await createDriverService(driver);

        if (!createdDriver) return c.text("Driver not created", 404);
        return c.json({ msg: createdDriver }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await c.req.json();
    try {
        const searchedDriver = await getDriverByIdService(id);
        if (searchedDriver == undefined) return c.text("Driver not found", 404);

        const res = await updateDriverService(id, driver);
        if (!res) return c.text("Driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteDriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const driver = await getDriverByIdService(id);
        if (driver == undefined) return c.text("Driver not found", 404);

        const res = await deleteDriverService(id);
        if (!res) return c.text("Driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getDriverByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const driver = await getDriverByNameService(name);
    if (driver == undefined) {
        return c.text("Driver not found", 404);
    }
    return c.json(driver, 200);
};
