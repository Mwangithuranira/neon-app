import { Hono } from 'hono';
import { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver, getDriverByName } from './driver.controller';
import { adminRoleAuth, driverRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const driverRouter = new Hono();

// Get all drivers      api/drivers
driverRouter.get('/drivers', adminRoleAuth, getAllDrivers);
// Get a single driver  api/drivers/1
driverRouter.get('/drivers/:id',driverRoleAuth, getDriverById);
// Search drivers by name  api/drivers/search/name
driverRouter.get('/drivers/search/:name', driverRoleAuth, getDriverByName);
// Create a driver      api/drivers
driverRouter.post('/drivers', adminRoleAuth, createDriver);
// Update a driver      api/drivers/1
driverRouter.put('/drivers/:id', driverRoleAuth, updateDriver);
// Delete a driver      api/drivers/1
driverRouter.delete('/drivers/:id', adminRoleAuth, deleteDriver);
