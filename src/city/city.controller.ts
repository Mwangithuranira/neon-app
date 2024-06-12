import { Context } from 'hono';
import { getAllCitiesService, getCityByIdService, createCityService, updateCityService, deleteCityService, getCityByNameService } from './city.service';

export const getAllCities = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllCitiesService(limit);
        if (data == null || data.length == 0) {
            return c.text("No cities found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCityById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const city = await getCityByIdService(id);
    if (city == undefined) {
        return c.text("City not found", 404);
    }
    return c.json(city, 200);
};

export const createCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const createdCity = await createCityService(city);

        if (!createdCity) return c.text("City not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const city = await c.req.json();
    try {
        const searchedCity = await getCityByIdService(id);
        if (searchedCity == undefined) return c.text("City not found", 404);

        const res = await updateCityService(id, city);
        if (!res) return c.text("City not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const city = await getCityByIdService(id);
        if (city == undefined) return c.text("City not found", 404);

        const res = await deleteCityService(id);
        if (!res) return c.text("City not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCityByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const city = await getCityByNameService(name);
    if (city == undefined) {
        return c.text("City not found", 404);
    }
    return c.json(city, 200);
};
