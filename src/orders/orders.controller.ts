import { Context } from 'hono';
import { 
    getAllOrdersService, 
    getOrderByIdService, 
    createOrderService,
    updateOrderService,
    deleteOrderService,
    // getOrderByStatusService 
} from './orders.service';

// Get all orders
export const getAllOrders = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllOrdersService(limit);
        if (!data || data.length === 0) {
            return c.text("No orders found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get order by ID
export const getOrderById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order = await getOrderByIdService(id);
    if (!order) {
        return c.text("Order not found", 404);
    }
    return c.json(order, 200);
};

// Create a new order
export const createOrder = async (c: Context) => {
    try {
        const order = await c.req.json();
        const createdOrder = await createOrderService(order);

        if (!createdOrder) return c.text("Order not created", 404);
        return c.json({ msg: createdOrder }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Update an order by ID
export const updateOrder = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const order = await c.req.json();
    try {
        const searchedOrder = await getOrderByIdService(id);
        if (!searchedOrder) return c.text("Order not found", 404);

        const res = await updateOrderService(id, order);
        if (!res) return c.text("Order not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Delete an order by ID
export const deleteOrder = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const order = await getOrderByIdService(id);
        if (!order) return c.text("Order not found", 404);

        const res = await deleteOrderService(id);
        if (!res) return c.text("Order not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

// Get order by status
// export const getOrderByStatus = async (c: Context) => {
//     const status = c.req.param("status");
//     if (typeof status !== "string") return c.text("Invalid status", 400);

//     const order = await getOrderByStatusService(status);
//     if (!order) {
//         return c.text("Order not found", 404);
//     }
//     return c.json(order, 200);
// };
