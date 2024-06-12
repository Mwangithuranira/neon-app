import { Hono } from 'hono';
import { 
    getAllStatusCatalogs, 
    getStatusCatalogById, 
    createStatusCatalog, 
    updateStatusCatalog, 
    deleteStatusCatalog, 
    getStatusCatalogByName 
} from './status_catalog.controller';
import { adminRoleAuth } from '../middleware/bearAuth';

export const catrouter = new Hono();

// Define the routes
catrouter.get('/status-catalogs',adminRoleAuth, getAllStatusCatalogs);
catrouter.get('/status-catalogs/:id',adminRoleAuth, getStatusCatalogById);
catrouter.post('/status-catalogs',adminRoleAuth, createStatusCatalog);
catrouter.put('/status-catalogs/:id',adminRoleAuth, updateStatusCatalog);
catrouter.delete('/status-catalogs/:id',adminRoleAuth, deleteStatusCatalog);
catrouter.get('/status-catalogs/name/:name',adminRoleAuth, getStatusCatalogByName);

export default catrouter;

