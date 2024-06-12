import { Context } from 'hono';
import { getAllAddressesService, getAddressByIdService, createAddressService, updateAddressService, deleteAddressService, getAddressByCityService } from './address.service';

export const getAllAddresses = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await getAllAddressesService(limit);
        if (data == null || data.length == 0) {
            return c.text("No addresses found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getAddressById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await getAddressByIdService(id);
    if (address == undefined) {
        return c.text("Address not found", 404);
    }
    return c.json(address, 200);
};

export const createAddress = async (c: Context) => {
    try {
        const address = await c.req.json();
        const createdAddress = await createAddressService(address);

        if (!createdAddress) return c.text("Address not created", 404);
        return c.json({ msg: createdAddress }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateAddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await c.req.json();
    try {
        const searchedAddress = await getAddressByIdService(id);
        if (searchedAddress == undefined) return c.text("Address not found", 404);

        const res = await updateAddressService(id, address);
        if (!res) return c.text("Address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteAddress = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const address = await getAddressByIdService(id);
        if (address == undefined) return c.text("Address not found", 404);

        const res = await deleteAddressService(id);
        if (!res) return c.text("Address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getAddressByCity = async (c: Context) => {
    const city = c.req.param("city");
    if (typeof city !== "string") return c.text("Invalid city", 400);

    const address = await getAddressByCityService(city);
    if (address == undefined) {
        return c.text("Address not found", 404);
    }
    return c.json(address, 200);
};
