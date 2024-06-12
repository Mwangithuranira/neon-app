//creating the schema for the database restaurant_management system
import { pgTable, serial, text, varchar, integer,pgEnum, primaryKey, decimal, boolean, date } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

// 1. Users Table
export const UsersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    contact_phone: varchar("contact_phone", { length: 100 }),
    phone_verified: boolean("phone_verified"),
    email: varchar("email", { length: 100 }),
    email_verified: boolean("email_verified"),
    confirmation_code: varchar("confirmation_code", { length: 256 }),
    password: varchar("password", { length: 256 }),
    created_at: date("created_at"),
    updated_at: date("updated_at")
});

// 2. Address Table
export const AddressTable = pgTable("address", {
    id: serial("id").primaryKey(),
    street_address_1: varchar("street_address_1", { length: 256 }),
    street_address_2: varchar("street_address_2", { length: 256 }),
    zip_code: varchar("zip_code", { length: 20 }),
    delivery_instructions: varchar("delivery_instructions", { length: 256 }),
    user_id: integer("user_id").references(() => UsersTable.id), // FK to Users table
    city_id: integer("city_id").references(() => CityTable.id), // FK to City table
    created_at: date("created_at"),
    updated_at: date("updated_at")

});

// 3. Category Table
export const CategoryTable = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    // menu_item_id: integer("menu_item_id").references(() => menu_item.id)
     // FK to Category table for hierarchical relationships
});

// 4. City Table
export const CityTable = pgTable("city", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    state_id: integer("state_id").references(() => StateTable.id) // FK to State table
});

// 5. Comment Table
export const CommentTable = pgTable("comment", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => OrdersTable.id), // FK to Orders table
    user_id: integer("user_id").references(() => UsersTable.id), // FK to Users table
    comment_text: varchar("comment_text", { length: 256 }),
    is_complaint: boolean("is_complaint"),
    is_praise: boolean("is_praise"),
    created_at: date("created_at"),
    updated_at: date("updated_at")
});

// 6. Driver Table
export const DriverTable = pgTable("driver", {
    id: serial("id").primaryKey(),
    car_make: varchar("car_make", { length: 100 }),
    car_model: varchar("car_model", { length: 100 }),
    car_year: integer("car_year"),
    user_id: integer("user_id").references(() => UsersTable.id), // FK to Users table
    online: boolean("online"),
    delivering: boolean("delivering"),
    created_at: date("created_at"),
    updated_at: date("updated_at")
});

// 7. MenuItem Table
export const MenuItemTable = pgTable("menu_item", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    restaurant_id: integer("restaurant_id").references(() => RestaurantTable.id), // FK to Restaurant table
    category_id: integer("category_id").references(() => CategoryTable.id), // FK to Category table
    description: varchar("description", { length: 256 }),
    ingredients: varchar("ingredients", { length: 256 }),
    price: decimal("price"),
    active: boolean("active"),
    created_at: date("created_at"),
    updated_at: date("updated_at")
});

// 8. OrderMenuItem Table
export const OrderMenuItemTable = pgTable("order_menu_item", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => OrdersTable.id), // FK to Orders table
    menu_item_id: integer("menu_item_id").references(() => MenuItemTable.id), // FK to MenuItem table
    quantity: integer("quantity"),
    item_price: decimal("item_price"),
    price: decimal("price"),
    comment: varchar("comment", { length: 256 })

});

// 9. OrderStatus Table
export const OrderStatusTable = pgTable("order_status", {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => OrdersTable.id), // FK to Orders table
    status_catalog_id: integer("status_catalog_id").references(() => StatusCatalogTable.id), // FK to StatusCatalog table
    created_at: date("created_at")
});

// 10. Orders Table
export const OrdersTable = pgTable("orders", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").references(() => RestaurantTable.id), // FK to Restaurant table
    estimated_delivery_time: date("estimated_delivery_time"),
    actual_delivery_time: date("actual_delivery_time"),
    delivery_address_id: integer("delivery_address_id").references(() => AddressTable.id), // FK to Address table
    user_id: integer("user_id").references(() => UsersTable.id), // FK to Users table
    driver_id: integer("driver_id").references(() => DriverTable.id), // FK to Driver table
    price: decimal("price"),
    discount: decimal("discount"),
    final_price: decimal("final_price"),
    comment: varchar("comment", { length: 256 }),
    created_at: date("created_at"),
    updated_at: date("updated_at")
});

// 11. Restaurant Table
export const RestaurantTable = pgTable("restaurant", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    street_address: varchar("street_address", { length: 256 }),
    zip_code: varchar("zip_code", { length: 20 }),
    city_id: integer("city_id").references(() => CityTable.id), // FK to City table
    created_at: date("created_at"),
    updated_at: date("updated_at")
});

// 12. State Table
export const StateTable = pgTable("state", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    code: varchar("code", { length: 10 })
});

// 13. StatusCatalog Table
export const StatusCatalogTable = pgTable("status_catalog", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 })
});

// 14. RestaurantOwner Table
export const RestaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").references(() => RestaurantTable.id), // FK to Restaurant table
    owner_id: integer("owner_id").references(() => UsersTable.id) // FK to Users table
});

// Relationships
export const addressRelations = relations(AddressTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [AddressTable.user_id],
        references: [UsersTable.id]
    }),
    city: one(CityTable, {
        fields: [AddressTable.city_id],
        references: [CityTable.id]
    })
}));

export const cityRelations = relations(CityTable, ({ one, many }) => ({
    state: one(StateTable, {
        fields: [CityTable.state_id],
        references: [StateTable.id]
    }),
    addresses: many(AddressTable) // One city can have many addresses
}));

export const commentRelations = relations(CommentTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [CommentTable.order_id],
        references: [OrdersTable.id]
    }),
    user: one(UsersTable, {
        fields: [CommentTable.user_id],
        references: [UsersTable.id]
    })
}));

export const driverRelations = relations(DriverTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [DriverTable.user_id],
        references: [UsersTable.id]
    }),
    // orders: many(OrdersTable, {
    //     Fields: [DriverTable.id],
    //     references: [OrdersTable.driver_id]
    }) // One driver can have many orders
);

export const menuItemRelations = relations(MenuItemTable, ({ one }) => ({
    restaurant: one(RestaurantTable, {
        fields: [MenuItemTable.restaurant_id],
        references: [RestaurantTable.id]
    }),
    category: one(CategoryTable, {
        fields: [MenuItemTable.category_id],
        references: [CategoryTable.id]
    })
}));

export const orderMenuItemRelations = relations(OrderMenuItemTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [OrderMenuItemTable.order_id],
        references: [OrdersTable.id]
    }),
    menu_item: one(MenuItemTable, {
        fields: [OrderMenuItemTable.menu_item_id],
        references: [MenuItemTable.id]
    })
}));

export const orderStatusRelations = relations(OrderStatusTable, ({ one }) => ({
    order: one(OrdersTable, {
        fields: [OrderStatusTable.order_id],
        references: [OrdersTable.id]
    }),
    status_catalog: one(StatusCatalogTable, {
        fields: [OrderStatusTable.status_catalog_id],
        references: [StatusCatalogTable.id]
    })
}));

export const ordersRelations = relations(OrdersTable, ({ one, many }) => ({
    restaurant: one(RestaurantTable, {
        fields: [OrdersTable.restaurant_id],
        references: [RestaurantTable.id]
    }),
    delivery_address: one(AddressTable, {
        fields: [OrdersTable.delivery_address_id],
        references: [AddressTable.id]
    }),
    user: one(UsersTable, {
        fields: [OrdersTable.user_id],
        references: [UsersTable.id]
    }),
    driver: one(DriverTable, {
        fields: [OrdersTable.driver_id],
        references: [DriverTable.id]
    }),
    comments: many(CommentTable), // One order can have many comments
    order_menu_items: many(OrderMenuItemTable), // One order can have many order menu items
    order_statuses: many(OrderStatusTable) // One order can have many statuses
}));

export const restaurantRelations = relations(RestaurantTable, ({ one, many }) => ({
    city: one(CityTable, {
        fields: [RestaurantTable.city_id],
        references: [CityTable.id]
    }),
    menu_items: many(MenuItemTable), // One restaurant can have many menu items
    orders: many(OrdersTable) // One restaurant can have many orders
}));

export const restaurantOwnerRelations = relations(RestaurantOwnerTable, ({ one }) => ({
    restaurant: one(RestaurantTable, {
        fields: [RestaurantOwnerTable.restaurant_id],
        references: [RestaurantTable.id]
    }),
    owner: one(UsersTable, {
        fields: [RestaurantOwnerTable.owner_id],
        references: [UsersTable.id]
    })
}));

export const usersRelations = relations(UsersTable, ({ one, many }) => ({
    address: one(AddressTable, {
        fields: [UsersTable.id],
        references: [AddressTable.user_id]
    }),
    comments: many(CommentTable), // One user can make many comments
    driver: one(DriverTable, {
        fields: [UsersTable.id],
        references: [DriverTable.user_id]
    }),
    orders: many(OrdersTable), // One user can place many orders
    restaurant_owner: one(RestaurantOwnerTable, {
        fields: [UsersTable.id],
        references: [RestaurantOwnerTable.owner_id]
    })
}));

//outhentication and authorization


export const roleEnum = pgEnum("role", ["admin", "user", "driver", "restaurant_owner"]);


export const AuthOnUsersTable = pgTable("auth_on_users", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    password: varchar("password", { length: 100 }),
    username: varchar("username", { length: 100 }),
    role: roleEnum("role").default("user"),
});
export const AuthOnUsersRelations = relations(AuthOnUsersTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [AuthOnUsersTable.userId],
        references: [UsersTable.id],
    }),
    driver: one(DriverTable, {
        fields: [AuthOnUsersTable.userId],
        references: [DriverTable.id],
    }),
    restaurantOwner: one(RestaurantOwnerTable, {
        fields: [AuthOnUsersTable.id],
        references: [RestaurantOwnerTable.id],
    }),
}));






// Types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TIAddress = typeof AddressTable.$inferInsert;
export type TSAddress = typeof AddressTable.$inferSelect;
export type TICategory = typeof CategoryTable.$inferInsert;
export type TSCategory = typeof CategoryTable.$inferSelect;
export type TICity = typeof CityTable.$inferInsert;
export type TSCity = typeof CityTable.$inferSelect;
export type TIComment = typeof CommentTable.$inferInsert;
export type TSComment = typeof CommentTable.$inferSelect;
export type TIDriver = typeof DriverTable.$inferInsert;
export type TSDriver = typeof DriverTable.$inferSelect;
export type TIMenuItem = typeof MenuItemTable.$inferInsert;
export type TSMenuItem = typeof MenuItemTable.$inferSelect;
export type TIOrderMenuItem = typeof OrderMenuItemTable.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItemTable.$inferSelect;
export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;
export type TIOrders = typeof OrdersTable.$inferInsert;
export type TSOrders = typeof OrdersTable.$inferSelect;
export type TIRestaurant = typeof RestaurantTable.$inferInsert;
export type TSRestaurant = typeof RestaurantTable.$inferSelect;
export type TIState = typeof StateTable.$inferInsert;
export type TSState = typeof StateTable.$inferSelect;
export type TIStatusCatalog = typeof StatusCatalogTable.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalogTable.$inferSelect;
export type TIRestaurantOwner = typeof RestaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwnerTable.$inferSelect;
export type TIAuthOnUser = typeof AuthOnUsersTable.$inferInsert;
export type TSAuthOnUser = typeof AuthOnUsersTable.$inferSelect;
// Path: src/drizzle/db.ts
