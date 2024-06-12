import db from "../drizzle/db";
import { TIMenuItem, TSMenuItem, MenuItemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all menu items
export const getAllMenuItemsService = async (limit?: number): Promise<TSMenuItem[] | null> => {
    if (limit) {
        return await db.query.MenuItemTable.findMany({
            limit: limit
        });
    }
    return await db.query.MenuItemTable.findMany(
        {
            with: {
                restaurant: true,
                category: true,
                
            }
        }
    );
};

// Get menu item by ID
export const getMenuItemByIdService = async (id: number): Promise<TIMenuItem | undefined> => {
    return await db.query.MenuItemTable.findFirst({
        where: eq(MenuItemTable.id, id)
    });
};

// Create a new menu item
export const createMenuItemService = async (menuItem: TIMenuItem) => {
    await db.insert(MenuItemTable).values(menuItem);
    return "Menu item created successfully";
};

// Update a menu item by ID
export const updateMenuItemService = async (id: number, menuItem: TIMenuItem) => {
    await db.update(MenuItemTable).set(menuItem).where(eq(MenuItemTable.id, id));
    return "Menu item updated successfully";
};

// Delete a menu item by ID
export const deleteMenuItemService = async (id: number) => {
    await db.delete(MenuItemTable).where(eq(MenuItemTable.id, id));
    return "Menu item deleted successfully";
};

// Get menu item by name
export const getMenuItemByNameService = async (name: string): Promise<TIMenuItem | undefined> => {
    return await db.query.MenuItemTable.findFirst({
        where: eq(MenuItemTable.name, name)
    });
};
