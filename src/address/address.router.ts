import { Hono } from 'hono';
import { getAllAddresses, getAddressById, createAddress, updateAddress, deleteAddress, getAddressByCity } from './address.controller';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';
import { get } from 'http';

export const addressRouter = new Hono();

// Get all addresses      api/addresses
addressRouter.get('/addresses', adminRoleAuth,getAllAddresses);
// Get a single address  api/addresses/1
addressRouter.get('/addresses/:id', adminRoleAuth, getAddressById);
// Search addresses by city  api/addresses/search/city
addressRouter.get('/addresses/search/:city', adminRoleAuth, getAddressByCity);
// Create an address      api/addresses
addressRouter.post('/addresses', adminRoleAuth,  createAddress);
// Update an address      api/addresses/1
addressRouter.put('/addresses/:id', adminRoleAuth,  updateAddress);
// Delete an address      api/addresses/1
addressRouter.delete('/addresses/:id', adminRoleAuth, deleteAddress);
