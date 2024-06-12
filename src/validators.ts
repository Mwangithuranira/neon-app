import { z } from 'zod'
import { Context } from 'hono';
import { ZodSchema } from 'zod';
import { AddressTable } from './drizzle/schema';

export const validate = (schema: ZodSchema) => {
  return async (c: Context, next: () => Promise<void>) => {
    try {
      const body = await c.req.json();
      schema.parse(body);
      c.req.addValidatedData = body; // Add validated data to request context
      await next();
    } catch (error) {
      return c.json({ error:error }, 400);
    }
  };
};


export const userSchema = z.object({
  fullname: z.string(),
  phone: z.string(),
  address: z.string(),
  score: z.number()
})


export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const registerUserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
})

//restaurant schema
export const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  score: z.number()
})

//restaurant-owner schema
