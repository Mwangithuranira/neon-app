import { eq } from 'drizzle-orm';
import db from '../drizzle/db';
import { TICategory, TSCategory, CategoryTable } from '../drizzle/schema';

export const getAllCategoriesService = async (limit?: number): Promise<TSCategory[] | null> => {
    if (limit) {
        return await db.query.CategoryTable.findMany({ limit: limit });
    }
    return await db.query.CategoryTable.findMany();
}

export const getCategoryByIdService = async (id: number): Promise<TICategory | undefined> => {
    return await db.query.CategoryTable.findFirst({
        where: eq(CategoryTable.id, id)
    });
}

export const createCategoryService = async (category: TICategory) => {
    await db.insert(CategoryTable).values(category);
    return "Category created successfully";
}

export const updateCategoryService = async (id: number, category: TICategory) => {
    await db.update(CategoryTable).set(category).where(eq(CategoryTable.id, id));
    return "Category updated successfully";
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(CategoryTable).where(eq(CategoryTable.id, id));
    return "Category deleted successfully";
}

export const getCategoryByNameService = async (name: string): Promise<TICategory | undefined> => {
    return await db.query.CategoryTable.findFirst({
        where: eq(CategoryTable.name, name)
    });
}
