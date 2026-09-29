const jwt=require('jsonwebtoken')
const appErorr=require('../../utlis/appError')

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['Authorization']||req.headers['authorization']
    if(!authHeader){
        const error=appErorr.create("token is required", 401, "error")
            return next(error)
       
    }
    const token=authHeader.split(" ")[1]
    try{
    const currentUser=jwt.verify(token,process.env.JWT_SECRET_KEY)//
    req.currentUser=currentUser 
    /*روحت حطيته فالريكويست عشان يقدر ينتقل للميدل وير اللي بعده
    الكارينت يوزر بعد ميخلص بيفضل جوا دالته فانا بطلعه احطه فالريكويست عشان اقدر استخدمه جوا ال الالويد
    */
    next()
}
catch(err){
 const error=appErorr.create("token invalid", 401, "error")
            return next(error)
       
}

}

module.exports=verifyToken