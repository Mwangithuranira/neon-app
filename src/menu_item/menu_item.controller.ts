import { Context } from 'hono';
import { 
    getAllMenuItemsService, 
    getMenuItemByIdService, 
    createMenuItemService,
    updateMenuItemService,
    deleteMenuItemService,
    getMenuItemByNameService 
} from './menu_item.service';

// Get all menu items
export const getAllMenuItems = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllMenuItemsService(limit);
        if (!data || data.length === 0) {
            return c.text("No menu items found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get menu item by ID
export const getMenuItemById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItem = await getMenuItemByIdService(id);
    if (!menuItem) {
        return c.text("Menu item not found", 404);
    }
    return c.json(menuItem, 200);
};

// Create a new menu item
export const createMenuItem = async (c: Context) => {
    try {
        const menuItem = await c.req.json();
        const createdMenuItem = await createMenuItemService(menuItem);

        if (!createdMenuItem) return c.text("Menu item not created", 404);
        return c.json({ msg: createdMenuItem }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update a menu item by ID
export const updateMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItem = await c.req.json();
    try {
        const searchedMenuItem = await getMenuItemByIdService(id);
        if (!searchedMenuItem) return c.text("Menu item not found", 404);

        const res = await updateMenuItemService(id, menuItem);
        if (!res) return c.text("Menu item not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete a menu item by ID
export const deleteMenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const menuItem = await getMenuItemByIdService(id);
        if (!menuItem) return c.text("Menu item not found", 404);

        const res = await deleteMenuItemService(id);
        if (!res) return c.text("Menu item not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get menu item by name
export const getMenuItemByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const menuItem = await getMenuItemByNameService(name);
    if (!menuItem) {
        return c.text("Menu item not found", 404);
    }
    return c.json(menuItem, 200);
};
