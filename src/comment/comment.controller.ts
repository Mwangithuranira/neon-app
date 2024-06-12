import { Context } from 'hono';
import { getAllCommentsService, getCommentByIdService, createCommentService, updateCommentService, deleteCommentService, getCommentsByRestaurantService, getCommentsByUserService } from './comment.service';

export const getAllComments = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllCommentsService(limit);
        if (data == null || data.length == 0) {
            return c.text("No comments found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCommentById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await getCommentByIdService(id);
    if (comment == undefined) {
        return c.text("Comment not found", 404);
    }
    return c.json(comment, 200);
};

export const createComment = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const createdComment = await createCommentService(comment);

        if (!createdComment) return c.text("Comment not created", 404);
        return c.json({ msg: createdComment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await c.req.json();
    try {
        const searchedComment = await getCommentByIdService(id);
        if (searchedComment == undefined) return c.text("Comment not found", 404);

        const res = await updateCommentService(id, comment);
        if (!res) return c.text("Comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteComment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const comment = await getCommentByIdService(id);
        if (comment == undefined) return c.text("Comment not found", 404);

        const res = await deleteCommentService(id);
        if (!res) return c.text("Comment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCommentsByRestaurant = async (c: Context) => {
    const restaurantId = parseInt(c.req.param("restaurantId"));
    if (isNaN(restaurantId)) return c.text("Invalid Restaurant ID", 400);

    const comments = await getCommentsByRestaurantService(restaurantId);
    if (comments == null || comments.length == 0) {
        return c.text("No comments found for this restaurant", 404);
    }
    return c.json(comments, 200);
};

export const getCommentsByUser = async (c: Context) => {
    const userId = parseInt(c.req.param("userId"));
    if (isNaN(userId)) return c.text("Invalid User ID", 400);

    const comments = await getCommentsByUserService(userId);
    if (comments == null || comments.length == 0) {
        return c.text("No comments found for this user", 404);
    }
    return c.json(comments, 200);
};
