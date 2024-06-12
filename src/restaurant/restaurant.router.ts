import { Hono } from 'hono';
import { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantByName } from './restaurant.controller';
import { adminRoleAuth, restaurantOwnerRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const restaurantRouter = new Hono();

// Get all restaurants      api/restaurants
restaurantRouter.get('/restaurants', adminRoleAuth, getAllRestaurants);
// Get a single restaurant  api/restaurants/1
restaurantRouter.get('/restaurants/:id', restaurantOwnerRoleAuth, getRestaurantById);
// Search restaurants by name  api/restaurants/search/name
restaurantRouter.get('/restaurants/search/:name',adminRoleAuth, getRestaurantByName);
// Create a restaurant      api/restaurants
restaurantRouter.post('/restaurants', adminRoleAuth, createRestaurant);
// Update a restaurant      api/restaurants/1
restaurantRouter.put('/restaurants/:id', restaurantOwnerRoleAuth, updateRestaurant);
// Delete a restaurant      api/restaurants/1
restaurantRouter.delete('/restaurants/:id', adminRoleAuth, deleteRestaurant);
