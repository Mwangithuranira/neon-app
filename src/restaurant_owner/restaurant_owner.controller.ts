import { Context } from 'hono';
import { 
    getAllRestaurantOwnersService, 
    getRestaurantOwnerByIdService, 
    createRestaurantOwnerService,
    updateRestaurantOwnerService,
    deleteRestaurantOwnerService,
    // getRestaurantOwnerByNameService 
} from './restaurant_owner.service';

// Get all restaurant owners
export const getAllRestaurantOwners = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllRestaurantOwnersService(limit);
        if (!data || data.length === 0) {
            return c.text("No restaurant owners found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get restaurant owner by ID
export const getRestaurantOwnerById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurantOwner = await getRestaurantOwnerByIdService(id);
    if (!restaurantOwner) {
        return c.text("Restaurant owner not found", 404);
    }
    return c.json(restaurantOwner, 200);
};

// Create a new restaurant owner
export const createRestaurantOwner = async (c: Context) => {
    try {
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner = await createRestaurantOwnerService(restaurantOwner);

        if (!createdRestaurantOwner) return c.text("Restaurant owner not created", 404);
        return c.json({ msg: createdRestaurantOwner }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update a restaurant owner by ID
export const updateRestaurantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurantOwner = await c.req.json();
    try {
        const searchedRestaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!searchedRestaurantOwner) return c.text("Restaurant owner not found", 404);

        const res = await updateRestaurantOwnerService(id, restaurantOwner);
        if (!res) return c.text("Restaurant owner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete a restaurant owner by ID
export const deleteRestaurantOwner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const restaurantOwner = await getRestaurantOwnerByIdService(id);
        if (!restaurantOwner) return c.text("Restaurant owner not found", 404);

        const res = await deleteRestaurantOwnerService(id);
        if (!res) return c.text("Restaurant owner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get restaurant owner by name
// export const getRestaurantOwnerByName = async (c: Context) => {
//     const name = c.req.param("name");
//     if (typeof name !== "string") return c.text("Invalid name", 400);

//     const restaurantOwner = await getRestaurantOwnerByNameService(name);
//     if (!restaurantOwner) {
//         return c.text("Restaurant owner not found", 404);
//     }
//     return c.json(restaurantOwner, 200);
// };
