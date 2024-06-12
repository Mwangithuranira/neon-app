import { Context, Hono } from 'hono';
import { getAllStates, getStateById, createState,  updateState, deleteState, getStateByName } from './state.controller';
import { adminRoleAuth } from '../middleware/bearAuth';
import { userSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const router = new Hono();

// Define the routes
router.get('/states',adminRoleAuth, getAllStates);
router.get('/states/:id',adminRoleAuth, getStateById);
router.post('/states',adminRoleAuth, createState);
router.put('/states/:id',adminRoleAuth, updateState);
router.delete('/states/:id',adminRoleAuth, deleteState);
router.get('/states/name/:name',adminRoleAuth, getStateByName);

export default router;
