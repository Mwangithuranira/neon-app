import { eq } from 'drizzle-orm';
import db from '../drizzle/db';
import { TIAddress, TSAddress, AddressTable, OrdersTable } from '../drizzle/schema';

export const getAllAddressesService = async (limit?: number): Promise<TSAddress[] | null> => {
    if (limit) {
        return await db.query.AddressTable.findMany({ limit: limit });
    }
    return await db.query.AddressTable.findMany(

         {
            with: {
                city: true,
                user: true,
                
            }
         }
        
    );
}

export const getAddressByIdService = async (id: number): Promise<TIAddress | undefined> => {
    return await db.query.AddressTable.findFirst({
        where: eq(AddressTable.id, id)
    });
}

export const createAddressService = async (address: TIAddress) => {
    await db.insert(AddressTable).values(address);
    return "Address created successfully";
}

export const updateAddressService = async (id: number, address: TIAddress) => {
    await db.update(AddressTable).set(address).where(eq(AddressTable.id, id));
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(AddressTable).where(eq(AddressTable.id, id));
    return "Address deleted successfully";
}

export const getAddressByCityService = async (city_id: string): Promise<TIAddress | undefined> => {
    return await db.query.AddressTable.findFirst({
        where: eq(AddressTable.city_id, parseInt(city_id))
    });
}
