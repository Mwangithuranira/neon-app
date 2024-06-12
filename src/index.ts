import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from "./users/user.router";

const app = new Hono()


//default route
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


//custom route
app.route('/api',userRouter);  

console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT) || 3000
})


import { restaurantRouter } from './restaurant/restaurant.router'; //10
import { addressRouter } from './address/address.router';   //1
import { categoryRouter} from './category/category.router';  //2
import { cityRouter } from "./city/city.router";  //3
import { commentRouter } from "./comment/comment.router";  //4
import {router} from "./state/state.router";
import {driverRouter} from "./driver/driver.router";  //5
import {mrouter} from "./menu_item/menu_item.router"; //6
import {orderrouter} from "./orders/orders.router";  //9
import {drouter} from "./order_menu_item/order_menu_item.router";  //7
import {statrouter} from "./order_status/order_status.router";  //8
import {catrouter} from "./status_catalog/state_catalog.router";
import {ownerrouter} from "./restaurant_owner/restaurant_owner.router";
import { authRouter } from './auth/auth.router'

app.route('/api', restaurantRouter); //1
app.route('/api', userRouter);   //2
app.route('/api', addressRouter);  //3
app.route('/api', categoryRouter);  //4
app.route('/api', cityRouter);     //5
app.route('/api', commentRouter);  //6
app.route('/api', router);   //7
app.route('/api', driverRouter);   //8
app.route('/api', mrouter);  //9
app.route('/api', orderrouter);    //10
app.route('/api', drouter);  //11
app.route('/api', statrouter);   //12
app.route('/api', catrouter);  //13
app.route('/api', ownerrouter);   //14
app.route('/api', authRouter);   //15



// Use the appropriate method to start the server in Node.js
serve(app);



