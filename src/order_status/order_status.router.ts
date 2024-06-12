import { Hono } from 'hono';
import { 
    getAllOrderStatuses, 
    getOrderStatusById, 
    createOrderStatus, 
    updateOrderStatus, 
    deleteOrderStatus, 
    // getOrderStatusByName 
} from './order_status.controller';
import { adminRoleAuth, restaurantOwnerRoleAuth } from '../middleware/bearAuth';
import { restaurantOwnerRelations } from '../drizzle/schema';

export const statrouter = new Hono();

// Define the routes
statrouter.get('/order-statuses',adminRoleAuth, getAllOrderStatuses);
statrouter.get('/order-statuses/:id',restaurantOwnerRoleAuth, getOrderStatusById);
statrouter.post('/order-statuses',adminRoleAuth, createOrderStatus);
statrouter.put('/order-statuses/:id',adminRoleAuth, updateOrderStatus);
statrouter.delete('/order-statuses/:id',adminRoleAuth, deleteOrderStatus);
// statrouter.get('/order-statuses/name/:name', getOrderStatusByName);

export default statrouter;

