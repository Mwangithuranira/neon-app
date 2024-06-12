import { Hono} from 'hono';
import { 
    getAllOrderMenuItems, 
    getOrderMenuItemById, 
    createOrderMenuItem, 
    updateOrderMenuItem, 
    deleteOrderMenuItem, 
    // getOrderMenuItemByName 
} from './order_menu_item.controller';
import { adminRoleAuth } from '../middleware/bearAuth';

export const drouter = new Hono();

// Define the routes
drouter.get('/order-menu-items',adminRoleAuth, getAllOrderMenuItems);
drouter.get('/order-menu-items/:id',adminRoleAuth, getOrderMenuItemById);
drouter.post('/order-menu-items',adminRoleAuth, createOrderMenuItem);
drouter.put('/order-menu-items/:id',adminRoleAuth, updateOrderMenuItem);
drouter.delete('/order-menu-items/:id',adminRoleAuth, deleteOrderMenuItem);
// drouter.get('/order-menu-items/name/:name', getOrderMenuItemByName);

export default drouter;

