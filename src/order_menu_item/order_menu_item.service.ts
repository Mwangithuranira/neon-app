import db from "../drizzle/db";
import { TIOrderMenuItem, TSOrderMenuItem, OrderMenuItemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all order menu items
export const getAllOrderMenuItemsService = async (limit?: number): Promise<TSOrderMenuItem[] | null> => {
    if (limit) {
        return await db.query.OrderMenuItemTable.findMany({
            limit: limit
        });
    }
    return await db.query.OrderMenuItemTable.findMany();
};

// Get order menu item by ID
export const getOrderMenuItemByIdService = async (id: number): Promise<TIOrderMenuItem | undefined> => {
    return await db.query.OrderMenuItemTable.findFirst({
        where: eq(OrderMenuItemTable.id, id)
    });
};

// Create a new order menu item
export const createOrderMenuItemService = async (orderMenuItem: TIOrderMenuItem) => {
    await db.insert(OrderMenuItemTable).values(orderMenuItem);
    return "Order menu item created successfully";
};

// Update an order menu item by ID
export const updateOrderMenuItemService = async (id: number, orderMenuItem: TIOrderMenuItem) => {
    await db.update(OrderMenuItemTable).set(orderMenuItem).where(eq(OrderMenuItemTable.id, id));
    return "Order menu item updated successfully";
};

// Delete an order menu item by ID
export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(OrderMenuItemTable).where(eq(OrderMenuItemTable.id, id));
    return "Order menu item deleted successfully";
};

// // Get order menu item by name
// export const getOrderMenuItemByNameService = async (name: string): Promise<TIOrderMenuItem | undefined> => {
//     return await db.query.OrderMenuItemTable.findFirst({
//         where: eq(OrderMenuItemTable.name, name)
//     });
// };
