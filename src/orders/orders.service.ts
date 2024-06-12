import db from "../drizzle/db";
import { TIOrders, TSOrders, OrdersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { serial } from 'drizzle-orm/pg-core';

// Get all orders
export const getAllOrdersService = async (limit?: number): Promise<TSOrders[] | null> => {
    if (limit) {
        return await db.query.OrdersTable.findMany({
            limit: limit
        });
    }
    return await db.query.OrdersTable.findMany();
};

// Get order by ID
export const getOrderByIdService = async (id: number): Promise<TIOrders | undefined> => {
    return await db.query.OrdersTable.findFirst({
        where: eq(OrdersTable.id, id)
    });
};

// Create a new order
export const createOrderService = async (order: TIOrders) => {
    await db.insert(OrdersTable).values(order);
    return "Order created successfully";
};

// Update an order by ID
export const updateOrderService = async (id: number, order: TIOrders) => {
    await db.update(OrdersTable).set(order).where(eq(OrdersTable.id, id));
    return "Order updated successfully";
};

// Delete an order by ID
export const deleteOrderService = async (id: number) => {
    await db.delete(OrdersTable).where(eq(OrdersTable.id, id));
    return "Order deleted successfully";
};
