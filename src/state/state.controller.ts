import { Context } from 'hono';

import { 
    getAllStatesService, 
    getStateByIdService, 
    createStateService, 
    updateStateService, 
    deleteStateService, 
    getStateByNameService 
} from './state.service';

// Get all states
export const getAllStates = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await getAllStatesService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


// Get state by ID
export const getStateById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await getStateByIdService(id);
    if (!state) {
        return c.text("State not found", 404);
    }
    return c.json(state, 200);
};

// Create a new state
export const createState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await createStateService(state);

        if (!createdState) return c.text("State not created", 404);
        return c.json({ msg: createdState }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update a state by ID
export const updateState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
        const searchedState = await getStateByIdService(id);
        if (!searchedState) return c.text("State not found", 404);

        const res = await updateStateService(id, state);
        if (!res) return c.text("State not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete a state by ID
export const deleteState = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const state = await getStateByIdService(id);
        if (!state) return c.text("State not found", 404);

        const res = await deleteStateService(id);
        if (!res) return c.text("State not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get state by name
export const getStateByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const state = await getStateByNameService(name);
    if (!state) {
        return c.text("State not found", 404);
    }
    return c.json(state, 200);
};
