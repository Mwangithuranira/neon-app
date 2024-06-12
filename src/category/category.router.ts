import { Hono } from 'hono';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, getCategoryByName } from './category.controller';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const categoryRouter = new Hono();

// Get all categories      api/categories
categoryRouter.get('/categories', adminRoleAuth, getAllCategories);
// Get a single category   api/categories/1
categoryRouter.get('/categories/:id', userRoleAuth, getCategoryById);
// Search categories by name  api/categories/search/name
categoryRouter.get('/categories/search/:name', adminRoleAuth,  getCategoryByName);
// Create a category       api/categories
categoryRouter.post('/categories', adminRoleAuth,  createCategory);
// Update a category       api/categories/1
categoryRouter.put('/categories/:id', adminRoleAuth, updateCategory);
// Delete a category       api/categories/1
categoryRouter.delete('/categories/:id', adminRoleAuth, deleteCategory);
