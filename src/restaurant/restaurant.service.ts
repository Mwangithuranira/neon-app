import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIRestaurant, TSRestaurant, RestaurantTable } from "../drizzle/schema";

export const getAllRestaurantsService = async (limit?: number): Promise<TSRestaurant[] | null> => {
    if (limit) {
        return await db.query.RestaurantTable.findMany({
            limit: limit
        });
    }
    return await db.query.RestaurantTable.findMany(
        {
            with: {
                city: true,
                menu_items: true,
                orders: true,
        
            }
        }
    );
}

export const getRestaurantByIdService = async (id: number): Promise<TIRestaurant | undefined> => {
    return await db.query.RestaurantTable.findFirst({
        where: eq(RestaurantTable.id, id)
    });
}

export const createRestaurantService = async (restaurant: TIRestaurant) => {
    await db.insert(RestaurantTable).values(restaurant);
    return "Restaurant created successfully";
}

export const updateRestaurantService = async (id: number, restaurant: TIRestaurant) => {
    await db.update(RestaurantTable).set(restaurant).where(eq(RestaurantTable.id, id));
    return "Restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) => {
    await db.delete(RestaurantTable).where(eq(RestaurantTable.id, id));
    return "Restaurant deleted successfully";
}

export const getRestaurantByNameService = async (name: string): Promise<TIRestaurant | undefined> => {
    return await db.query.RestaurantTable.findFirst({
        where: eq(RestaurantTable.name, name)
    });
}
