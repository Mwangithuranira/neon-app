import { Hono } from 'hono';
import { 
    getAllRestaurantOwners, 
    getRestaurantOwnerById, 
    createRestaurantOwner, 
    updateRestaurantOwner, 
    deleteRestaurantOwner, 
    // getRestaurantOwnerByName 
} from './restaurant_owner.controller';
import { adminRoleAuth, restaurantOwnerRoleAuth } from '../middleware/bearAuth';

export const ownerrouter = new Hono();

// Define the routes
ownerrouter.get('/restaurant-owners',adminRoleAuth, getAllRestaurantOwners);
ownerrouter.get('/restaurant-owners/:id',restaurantOwnerRoleAuth, getRestaurantOwnerById);
ownerrouter.post('/restaurant-owners',adminRoleAuth, createRestaurantOwner);
ownerrouter.put('/restaurant-owners/:id',restaurantOwnerRoleAuth, updateRestaurantOwner);
ownerrouter.delete('/restaurant-owners/:id',adminRoleAuth, deleteRestaurantOwner);
// ownerrouter.get('/restaurant-owners/name/:name', getRestaurantOwnerByName);

export default ownerrouter;
