import db from "../drizzle/db";
import { TIRestaurantOwner, TSRestaurantOwner, RestaurantOwnerTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Get all restaurant owners
export const getAllRestaurantOwnersService = async (limit?: number): Promise<TSRestaurantOwner[] | null> => {
    if (limit) {
        return await db.query.RestaurantOwnerTable.findMany({
            limit: limit
        });
    }
    return await db.query.RestaurantOwnerTable.findMany(
        {
            with: {
                restaurant: true,
                owner: true,
            }
        }
    );
};

// Get restaurant owner by ID
export const getRestaurantOwnerByIdService = async (id: number): Promise<TIRestaurantOwner | undefined> => {
    return await db.query.RestaurantOwnerTable.findFirst({
        where: eq(RestaurantOwnerTable.id, id)
    });
};

// Create a new restaurant owner
export const createRestaurantOwnerService = async (restaurantOwner: TIRestaurantOwner) => {
    await db.insert(RestaurantOwnerTable).values(restaurantOwner);
    return "Restaurant owner created successfully";
};

// Update a restaurant owner by ID
export const updateRestaurantOwnerService = async (id: number, restaurantOwner: TIRestaurantOwner) => {
    await db.update(RestaurantOwnerTable).set(restaurantOwner).where(eq(RestaurantOwnerTable.id, id));
    return "Restaurant owner updated successfully";
};

// Delete a restaurant owner by ID
export const deleteRestaurantOwnerService = async (id: number) => {
    await db.delete(RestaurantOwnerTable).where(eq(RestaurantOwnerTable.id, id));
    return "Restaurant owner deleted successfully";
};

// // Get restaurant owner by name
// export const getRestaurantOwnerByNameService = async (name: string): Promise<TIRestaurantOwner | undefined> => {
//     return await db.query.RestaurantOwnerTable.findFirst({
//         where: eq(RestaurantOwnerTable.name, name)
//     });
// };

