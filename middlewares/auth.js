import jwt from  'jsonwebtoken';

const authMiddleware = async (req ,res ,next) => {
  const {token} = req.headers;
  console.log("ttttt", token);
  
  if(!token){
    return res.json({success : false , message : "Not Authorized. Login Again"})
  }

  try{
    const token_decode = jwt.verify(token , process.env.JWT_SECRET)
    req.body.userId = token_decode.id;
    console.log(token_decode);
    
    next()
  }
  catch(error){
   console.log(error);
   res.json({success:false , message : 'error'})
  }
}

export default  authMiddleware;