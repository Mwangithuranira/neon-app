import { Context } from 'hono';
import { 
    getAllOrderStatusesService, 
    getOrderStatusByIdService, 
    createOrderStatusService,
    updateOrderStatusService,
    deleteOrderStatusService,
    // getOrderStatusByNameService 
} from './order_status.service';

// Get all order statuses
export const getAllOrderStatuses = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllOrderStatusesService(limit);
        if (!data || data.length === 0) {
            return c.text("No order statuses found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get order status by ID
export const getOrderStatusById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderStatus = await getOrderStatusByIdService(id);
    if (!orderStatus) {
        return c.text("Order status not found", 404);
    }
    return c.json(orderStatus, 200);
};

// Create a new order status
export const createOrderStatus = async (c: Context) => {
    try {
        const orderStatus = await c.req.json();
        const createdOrderStatus = await createOrderStatusService(orderStatus);

        if (!createdOrderStatus) return c.text("Order status not created", 404);
        return c.json({ msg: createdOrderStatus }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update an order status by ID
export const updateOrderStatus = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderStatus = await c.req.json();
    try {
        const searchedOrderStatus = await getOrderStatusByIdService(id);
        if (!searchedOrderStatus) return c.text("Order status not found", 404);

        const res = await updateOrderStatusService(id, orderStatus);
        if (!res) return c.text("Order status not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete an order status by ID
export const deleteOrderStatus = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const orderStatus = await getOrderStatusByIdService(id);
        if (!orderStatus) return c.text("Order status not found", 404);

        const res = await deleteOrderStatusService(id);
        if (!res) return c.text("Order status not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// // Get order status by name
// export const getOrderStatusByName = async (c: Context) => {
//     const name = c.req.param("name");
//     if (typeof name !== "string") return c.text("Invalid name", 400);

//     const orderStatus = await getOrderStatusByNameService(name);
//     if (!orderStatus) {
//         return c.text("Order status not found", 404);
//     }
//     return c.json(orderStatus, 200);
// };
