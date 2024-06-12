import { Context } from 'hono';
import { getAllCategoriesService, getCategoryByIdService, createCategoryService, updateCategoryService, deleteCategoryService, getCategoryByNameService } from './category.service';

export const getAllCategories = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllCategoriesService(limit);
        if (data == null || data.length == 0) {
            return c.text("No categories found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCategoryById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const category = await getCategoryByIdService(id);
    if (category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(category, 200);
};

export const createCategory = async (c: Context) => {
    try {
        const category = await c.req.json();
        const createdCategory = await createCategoryService(category);

        if (!createdCategory) return c.text("Category not created", 404);
        return c.json({ msg: createdCategory }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const category = await c.req.json();
    try {
        const searchedCategory = await getCategoryByIdService(id);
        if (searchedCategory == undefined) return c.text("Category not found", 404);

        const res = await updateCategoryService(id, category);
        if (!res) return c.text("Category not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCategory = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const category = await getCategoryByIdService(id);
        if (category == undefined) return c.text("Category not found", 404);

        const res = await deleteCategoryService(id);
        if (!res) return c.text("Category not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getCategoryByName = async (c: Context) => {
    const name = c.req.param("name");
    if (typeof name !== "string") return c.text("Invalid name", 400);

    const category = await getCategoryByNameService(name);
    if (category == undefined) {
        return c.text("Category not found", 404);
    }
    return c.json(category, 200);
};
