import { Hono } from 'hono';
import { getAllComments, getCommentById, createComment, updateComment, deleteComment, getCommentsByRestaurant, getCommentsByUser } from './comment.controller';
import { adminRoleAuth, userRoleAuth } from '../middleware/bearAuth';

export const commentRouter = new Hono();

// Get all comments      api/comments
commentRouter.get('/comments', adminRoleAuth, getAllComments);
// Get a single comment   api/comments/1
commentRouter.get('/comments/:id', adminRoleAuth, getCommentById);
// Get comments by restaurant id  api/comments/restaurant/1
commentRouter.get('/comments/restaurant/:restaurantId', adminRoleAuth, getCommentsByRestaurant);
// Get comments by user id  api/comments/user/1
commentRouter.get('/comments/user/:userId', adminRoleAuth, getCommentsByUser);
// Create a comment       api/comments
commentRouter.post('/comments', adminRoleAuth, createComment);
// Update a comment       api/comments/1
commentRouter.put('/comments/:id', adminRoleAuth,  updateComment);
// Delete a comment       api/comments/1
commentRouter.delete('/comments/:id', adminRoleAuth,  deleteComment);
