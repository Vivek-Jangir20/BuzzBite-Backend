import express from 'express'
import { addToCart , removeFromCart , getCart } from '../controllers/cartcontroller.js'
import  authMiddleware  from '../middlewares/auth.js'

const cartRouter = express.Router()

cartRouter.post("/add" , authMiddleware , addToCart)
cartRouter.post("/remove" , authMiddleware , removeFromCart)
cartRouter.get("/get/:id" , getCart)

export default cartRouter