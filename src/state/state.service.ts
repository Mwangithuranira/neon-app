import { eq } from "drizzle-orm";
import  db  from "../drizzle/db";
import { StateTable, TIState, TIUser, TSState, TSUser,  } from "../drizzle/schema";

export const getAllStatesService = async (limit?: number): Promise<TSState[] | null> => {
    if (limit) {
        return await db.query.StateTable.findMany({
            limit: limit
        });
    }
    return await db.query.StateTable.findMany(
        {
            with: {
               // users: true,
                
                
            }
        }
    );
}

export const getStateByIdService = async (id: number): Promise<TIState | undefined> => {
    return await db.query.StateTable.findFirst({
        where: eq(StateTable.id, id),
        columns: {
            id: true,
            name: true,
            
        }
    })
}


//get user by name
export const getStateByName = async (name: string): Promise<TIState | undefined> => {
    return await db.query.StateTable.findFirst({
        where: eq(StateTable.name, name)
    })
}



export const createStateService = async (state: TIUser) => {
    await db.insert(StateTable).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: TIState) => {
    await db.update(StateTable).set(state).where(eq(StateTable.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(StateTable).where(eq(StateTable.id, id))
    return "state deleted successfully";
}

export const getStateByNameService = async (name:string): Promise<TIState | undefined> => {
    return await db.query.StateTable.findFirst({
        where: eq(StateTable.name, name)
    })
}


