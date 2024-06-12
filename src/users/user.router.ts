import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser ,GetUser} from "./user.controller"
// import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { adminRoleAuth, useradminRoleAuth, userRoleAuth } from "../middleware/bearAuth";


export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", adminRoleAuth,
   // userRoleAuth, 
    listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id",   userRoleAuth, getUser);
//search users by name
userRouter.get("/users/search/:name", adminRoleAuth, userRoleAuth)
//create a user
userRouter.post("/users",   userRoleAuth,createUser)
//update a user
userRouter.put("/users/:id", adminRoleAuth,updateUser)
//delete a user
userRouter.delete("/users/:id",  adminRoleAuth,  deleteUser)
