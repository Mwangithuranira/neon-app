import { Hono } from 'hono';
import { 
    getAllOrders, 
    getOrderById, 
    createOrder, 
    updateOrder, 
    deleteOrder, 
    // getOrderByStatus 
} from './orders.controller';
import { adminRoleAuth, restaurantOwnerRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const orderrouter = new Hono();

// Define the routes
orderrouter.get('/orders',restaurantOwnerRoleAuth, getAllOrders);
orderrouter.get('/orders/:id',restaurantOwnerRoleAuth, getOrderById);
orderrouter.post('/orders',userRoleAuth, createOrder);
orderrouter.put('/orders/:id',userRoleAuth, updateOrder);
orderrouter.delete('/orders/:id',adminRoleAuth, deleteOrder);
// orderrouter.get('/orders/status/:status', getOrderByStatus);

export default orderrouter;
