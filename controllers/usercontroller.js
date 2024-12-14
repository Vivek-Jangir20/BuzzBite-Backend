import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt, { genSalt } from "bcrypt"
import validator from "validator"


// for loging user
const loginUser = async (req , res) =>{
  const {email , password} = req.body

  try{
     const user = await userModel.findOne({email})
     if(!user){
      return res.status(404).json({success : true , message : "user doesn't exist"})
     }

     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
      return res.json({succcess : false , message : "Password doesn't match"})
     }
    //  const token = createToken(user._id)
    const token = jwt.sign({id : user._id, user: user} , process.env.JWT_SECRET , {expiresIn : "1d"})
  
     res.json({success : true , token})
    }
  catch(error){
        console.log(error);
        res.json({success : false , message :"Error"})
        
  }
}


// const createToken = (id) => {
//     return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : "1d"})
// }

//for registering user
const registerUser = async (req , res) =>{
   const {name , email , password } = req.body

   try{

   const exists = await userModel.findOne({email})
   if(exists){
    return res.json({succcess : false , message : "User already exists"})
   }

   if(!validator.isEmail(email)){
    return res.json({success : false , message : "Please enter a valid email"})
   }
   if(password.length<8){
    return res.json({success : false , message : "Please enter a strong password"})
   }

   const salt = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(password , salt)

   const newUser = new userModel({
    name : name,
    email : email ,
    password : hashedpassword
   })
   const user = await newUser.save()

  //  const token = createToken(user._id)
  const token = jwt.sign({id : user._id,user: user} , process.env.JWT_SECRET , {expiresIn : "1d"})
   
   res.json({success : true , token})

}  catch(error){
    console.log(error);
    res.json({success : false , message : "Error"})
    
}

}


export {loginUser , registerUser}