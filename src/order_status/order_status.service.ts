import db from "../drizzle/db";
import { TIOrderStatus, TSOrderStatus, OrderStatusTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all order statuses
export const getAllOrderStatusesService = async (limit?: number): Promise<TSOrderStatus[] | null> => {
    if (limit) {
        return await db.query.OrderStatusTable.findMany({
            limit: limit
        });
    }
    return await db.query.OrderStatusTable.findMany();
};

// Get order status by ID
export const getOrderStatusByIdService = async (id: number): Promise<TIOrderStatus | undefined> => {
    return await db.query.OrderStatusTable.findFirst({
        where: eq(OrderStatusTable.id, id)
    });
};

// Create a new order status
export const createOrderStatusService = async (orderStatus: TIOrderStatus) => {
    await db.insert(OrderStatusTable).values(orderStatus);
    return "Order status created successfully";
};

// Update an order status by ID
export const updateOrderStatusService = async (id: number, orderStatus: TIOrderStatus) => {
    await db.update(OrderStatusTable).set(orderStatus).where(eq(OrderStatusTable.id, id));
    return "Order status updated successfully";
};

// Delete an order status by ID
export const deleteOrderStatusService = async (id: number) => {
    await db.delete(OrderStatusTable).where(eq(OrderStatusTable.id, id));
    return "Order status deleted successfully";
};

// // Get order status by name
// export const getOrderStatusByNameService = async (name: string): Promise<TIOrderStatus | undefined> => {
//     return await db.query.OrderStatusTable.findFirst({
//         where: eq(OrderStatusTable.name, name)
//     });
// };

