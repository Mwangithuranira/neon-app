import { eq } from 'drizzle-orm';
import db from '../drizzle/db';
import { TIComment, TSComment, CommentTable } from '../drizzle/schema';

export const getAllCommentsService = async (limit?: number): Promise<TSComment[] | null> => {
    if (limit) {
        return await db.query.CommentTable.findMany({ limit: limit });
    }
    return await db.query.CommentTable.findMany(
        {
            with: {
                order: true,
                user: true
            }
        }
    );
}

export const getCommentByIdService = async (id: number): Promise<TIComment | undefined> => {
    return await db.query.CommentTable.findFirst({
        where: eq(CommentTable.id, id)
    });
}

export const createCommentService = async (comment: TIComment) => {
    await db.insert(CommentTable).values(comment);
    return "Comment created successfully";
}

export const updateCommentService = async (id: number, comment: TIComment) => {
    await db.update(CommentTable).set(comment).where(eq(CommentTable.id, id));
    return "Comment updated successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(CommentTable).where(eq(CommentTable.id, id));
    return "Comment deleted successfully";
}

export const getCommentsByRestaurantService = async (order_id: number): Promise<TSComment[] | null> => {
    return await db.query.CommentTable.findMany({
        where: eq(CommentTable.order_id, order_id)
    });
}

export const getCommentsByUserService = async (order_id: number): Promise<TSComment[] | null> => {
    return await db.query.CommentTable.findMany({
        where: eq(CommentTable.order_id, order_id)
    });
}
