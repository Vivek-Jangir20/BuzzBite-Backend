import orderModel from "../models/ordermodel.js";
import userModel  from "../models/userModel.js";
import Stripe from 'stripe';


const stripekey = new Stripe("sk_test_51QFWMeF33IhqAwrSPSCIEeyfaM588I39PNumvY5bA5NgSVkoX63fF9uD81i2IJv8rWBNpmFOFc8D7tTfedZea8KA00K0adTki4pk_test_51QFWMeF33IhqAwrStgLAclwJO7JCg4k0z4i5R8HVFFxNRkFU7B6guMvk07g7jEjL5zd3QiqnA5hw8x8yCKQwbv2X00Q8dcEIV2");


//placing user order from frontend

const placeOrder = async (req , res) =>{

   const frontend_url = "http://localhost:5173"

   try{         
        const newOrder = new orderModel({
         userId : req.body.userId,
         items : req.body.items,
         amount : req.body.amount,
         address : req.body.address
        })

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId , {cartData : {}})

        const line_items = req.body.items.map((item) => ({
            price_data : {
               currency : "inr",
               product_data:{
                  name : item.name,
               },
               unit_amount : item.price*100*80
            },
            quantity : item.quantity
        }))

        line_items.push({
         price_data : {
            currency : "inr",
            product_data : {
               name : "Delivery Charges",
            },
            unit_amount : 2*100*80
         },
         quantity : 1
        })
       
        const session = await stripekey.Checkout.sessions.create({
         line_items : line_items,
         mode : "payment",
         success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
         cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
         console.log(stripekey);
         
        res.json({success : true , session_url : session.url})

   }
   catch (error){
        console.log(error);
        res.json({success : false , message : "Error"})
        
   }
}

const verifyOrder = async (req ,res) => {
   const {orderId , success} = req.body
   try{
     if(success == "true"){
        await orderModel.findByIdAndUpdate(orderId , {payment : true})
        res.json({success : true , message : "Paid"})
     }
     else{
        await orderModel.findByIdAndUpdate(orderId)
        res.json({success : false , message : "Not Paid"})
     }
   }
   catch(error){
     console.log(error);
     res.json({success:false , message : "error"})
     
   }
}

//users order for frontend

const userOrders = async (req ,res) => {
   try{
         const orders = await orderModel.find({userId : req.body.userId})
         res.json({success :true , data : orders})
   }
   catch(error){
         console.log(error);
         res.json({success : false , message : "error in userorders api"})
         
   }

}

// liting order for admin panel

const listOrders = async (req ,res) => {
     try{
      const orders = await orderModel.find({})
      res.json({success:true , data : orders})
     }
     catch(error){
        console.log(error);
        res.json({success : false , message : "error in listorders api"})
        
     }
}

export {placeOrder , verifyOrder , userOrders , listOrders}