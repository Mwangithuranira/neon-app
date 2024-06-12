import "dotenv/config";
import { verify } from "hono/jwt";
import { Context, Next } from "hono";

// AUTHENTICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token as string, secret);
        return decoded;
    } catch (error: any) {
        return null;
    }
};

// AUTHORIZATION MIDDLEWARE
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const token = c.req.header("Authorization");

    if (!token) return c.json({ error: "Please verify via token provided during login" }, 401);

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) return c.json({ error: "Invalid token" }, 401);

    if (decoded.role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);

    return next();
};

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");
export const driverRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "driver");
export const restaurantOwnerRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "restaurant_owner");
export const useradminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user || admin");
export const driveradminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "driver || admin");
export const restaurantOwneradminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "restaurant_owner || admin");

