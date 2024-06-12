import { Hono } from 'hono';
import { getAllCities, getCityById, createCity, updateCity, deleteCity, getCityByName } from './city.controller';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const cityRouter = new Hono();

// Get all cities      api/cities
cityRouter.get('/cities', adminRoleAuth, getAllCities);
// Get a single city   api/cities/1
cityRouter.get('/cities/:id', adminRoleAuth, getCityById);
// Search cities by name  api/cities/search/name
cityRouter.get('/cities/search/:name', adminRoleAuth,  getCityByName);
// Create a city       api/cities
cityRouter.post('/cities', adminRoleAuth, createCity);
// Update a city       api/cities/1
cityRouter.put('/cities/:id', adminRoleAuth,  updateCity);
// Delete a city       api/cities/1
cityRouter.delete('/cities/:id', adminRoleAuth, deleteCity);
