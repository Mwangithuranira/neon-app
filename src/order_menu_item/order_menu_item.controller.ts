import { Context } from 'hono';
import { 
    getAllOrderMenuItemsService, 
    getOrderMenuItemByIdService, 
    createOrderMenuItemService,
    updateOrderMenuItemService,
    deleteOrderMenuItemService,
    // getOrderMenuItemByNameService 
} from './order_menu_item.service';

// Get all order menu items
export const getAllOrderMenuItems = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllOrderMenuItemsService(limit);
        if (!data || data.length === 0) {
            return c.text("No order menu items found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get order menu item by ID
export const getOrderMenuItemById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderMenuItem = await getOrderMenuItemByIdService(id);
    if (!orderMenuItem) {
        return c.text("Order menu item not found", 404);
    }
    return c.json(orderMenuItem, 200);
};

// Create a new order menu item
export const createOrderMenuItem = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await createOrderMenuItemService(orderMenuItem);

        if (!createdOrderMenuItem) return c.text("Order menu item not created", 404);
        return c.json({ msg: createdOrderMenuItem }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update an order menu item by ID
export const updateOrderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderMenuItem = await c.req.json();
    try {
        const searchedOrderMenuItem = await getOrderMenuItemByIdService(id);
        if (!searchedOrderMenuItem) return c.text("Order menu item not found", 404);

        const res = await updateOrderMenuItemService(id, orderMenuItem);
        if (!res) return c.text("Order menu item not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete an order menu item by ID
export const deleteOrderMenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const orderMenuItem = await getOrderMenuItemByIdService(id);
        if (!orderMenuItem) return c.text("Order menu item not found", 404);

        const res = await deleteOrderMenuItemService(id);
        if (!res) return c.text("Order menu item not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// // Get order menu item by name
// export const getOrderMenuItemByName = async (c: Context) => {
//     const name = c.req.param("name");
//     if (typeof name !== "string") return c.text("Invalid name", 400);

//     const orderMenuItem = await getOrderMenuItemByNameService(name);
//     if (!orderMenuItem) {
//         return c.text("Order menu item not found", 404);
//     }
//     return c.json(orderMenuItem, 200);
// };

