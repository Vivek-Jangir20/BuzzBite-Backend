import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrders, placeOrder, userOrders, verifyOrder } from "../controllers/ordercontroller.js"

const orderRouter = express.Router()

 orderRouter.post("/place" , authMiddleware , placeOrder)
 orderRouter.post("/verify" ,verifyOrder)
 orderRouter.post("/userorders" , authMiddleware , userOrders)
 orderRouter.get("/listorders" , listOrders)

 export default orderRouter;