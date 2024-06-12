import { Context } from 'hono';
import { getAllRestaurantsService, getRestaurantByIdService, createRestaurantService, updateRestaurantService, deleteRestaurantService, getRestaurantByNameService } from './restaurant.service';

export const getAllRestaurants = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllRestaurantsService(limit);
        if (data == null || data.length == 0) {
            return c.text("No restaurants found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getRestaurantById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await getRestaurantByIdService(id);
    if (restaurant == undefined) {
        return c.text("Restaurant not found", 404);
    }
    return c.json(restaurant, 200);
};

export const createRestaurant = async (c: Context) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await createRestaurantService(restaurant);

        if (!createdRestaurant) return c.text("Restaurant not created", 404);
        return c.json({ msg: createdRestaurant }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateRestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurant = await c.req.json();
    try {
        const searchedRestaurant = await getRestaurantByIdService(id);
        if (searchedRestaurant == undefined) return c.text("Restaurant not found", 404);

        const res = await updateRestaurantService(id, restaurant);
        if (!res) return c.text("Restaurant not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteRestaurant = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const restaurant = await getRestaurantByIdService(id);
        if (restaurant == undefined) return c.text("Restaurant not found", 404);

        const res = await deleteRestaurantService(id);
        if (!res) return c.text("Restaurant not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getRestaurantByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const restaurant = await getRestaurantByNameService(name);
    if (restaurant == undefined) {
        return c.text("Restaurant not found", 404);
    }
    return c.json(restaurant, 200);
};


