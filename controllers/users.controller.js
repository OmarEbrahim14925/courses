const asyncWrapper=require('express-async-handler')
const user=require('../models/users.model')
const appErorr=require('../utlis/appError')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const getALLusers=asyncWrapper(async(req,res)=>{
const query=req.query
const limit=query.limit || 2
const page=query.page || 1
const skip=(page-1)*limit


    const users=await user.find({/*qeury fillter */},{"__v":false}).limit(limit).skip(skip)
        res.json({status:"success",data:{users}})
    })


const register=asyncWrapper(async(req,res,next)=>{
    const{firstName,lastName,email,password,role}=req.body

const olduser= await user.findOne({email:email})
if(olduser){
    const error=appErorr.create("Email already exists", 400, "fail")
    return next(error)
}

const hashPassword=await bcrypt.hash(password,10)

    const newUser= new user({
        firstName
        ,lastName
        ,email
        ,password:hashPassword
        ,role
        ,avatar:req.file.filename
    })
const token=jwt.sign({ email: newUser.email, id: newUser._id , role:newUser.role,role:newUser.role}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
newUser.token=token



    await newUser.save()
    res.status(201).json({status:"success",data:{user:newUser}})
})

const login =asyncWrapper(async(req,res,next)=>{
const {email,password,role}=req.body
if(!email && !password){
    const error=appErorr.create("Email and password are required ", 400, "fail")
    return next(error)
}

const userLogin=await user.findOne({email:email})
if(!userLogin){
const error=appErorr.create("Email not found ", 400, "fail")
    return next(error)
}
const hashingPassword= await bcrypt.compare(password,userLogin.password)
if(userLogin&&hashingPassword){
   const token=jwt.sign({ email: userLogin.email, id: userLogin._id,role:userLogin.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
res.status(201).json({status:"success",data:{token:token}})

}

else{
    const error=appErorr.create("somthing wrong ", 500, "error")
    return next(error)
}



})

module.exports={
    getALLusers,
    register,
    login
}