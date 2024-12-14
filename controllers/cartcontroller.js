import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req , res) =>{
   try{
     let userData = await userModel.findById(req.body.userId)

     if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
  }
     
     let cartData = await userData.cartData || {}
     
     
     if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1
     }
     else{
      cartData[req.body.itemId] += 1
     }
     await userModel.findByIdAndUpdate(req.body.userId , {cartData})
     res.json({success : true , message : "Added To Cart"})
   }
   catch(error){
    console.log(error);
    res.json({success : false , message : "Error"})
    
   }
}

//remove items from user cart
const removeFromCart = async (req , res) => {
   try{
      let userData = await userModel.findOne({_id: req.body.userId})
      let cartData = await userData.cartData || {}
      if(cartData[req.body.itemId] > 0){
         cartData[req.body.itemId] -= 1
      }
      await userModel.findByIdAndUpdate(req.body.userId , {cartData})
      res.json({success : true , message : "Removed From Cart"})
      
   }
   catch(error){
         console.log(error);
         res.json({success : false , message : "Error"})
         
   }
}

//fetchuser cart data
const getCart = async (req , res) => {
   try{
        const userId = req.params.id;
        
        let userData = await userModel.findById(userId)
        let cartData = await userData.cartData 
        res.json({success : true , userData})
   }
   catch(error){
      console.log(error);
      res.json({success : false , message : "Error"})
      
   }
   // 44444444444444444
}

export {addToCart , removeFromCart , getCart}