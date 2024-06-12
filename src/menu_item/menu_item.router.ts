import { Hono} from 'hono';
import { 
    getAllMenuItems, 
    getMenuItemById, 
    createMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    getMenuItemByName 
} from './menu_item.controller';
import { adminRoleAuth } from '../middleware/bearAuth';

export const mrouter = new Hono();

// Define the routes
mrouter.get('/menu-items',adminRoleAuth, getAllMenuItems);
mrouter.get('/menu-items/:id',adminRoleAuth, getMenuItemById);
mrouter.post('/menu-items',adminRoleAuth, createMenuItem);
mrouter.put('/menu-items/:id',adminRoleAuth, updateMenuItem);
mrouter.delete('/menu-items/:id',adminRoleAuth, deleteMenuItem);
mrouter.get('/menu-items/name/:name',adminRoleAuth, getMenuItemByName);

export default mrouter;

