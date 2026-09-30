const express=require('express')
 const router=express.Router()
 const usersController=require('../controllers/users.controller')
 const verifyToken=require('../routes/middleware/verifyToken')
 const multer=require('multer')
const appError = require('../utlis/appError')

const diskStorage=multer.diskStorage({
   destination:(req,file,cb)=>{
cb(null,'uploads')//cb(error,مكان التخزين )
   },
   filename:(req,file,cb)=>{
      const ext=file.mimetype.split('/')[1]
      const filename=`user-${Date.now()}.${ext}`
      cb(null,filename)
}})
const fileFilter=(req,file,cb)=>{
const imageType=file.mimetype.split('/')[0]
if(imageType=='image'){
   return cb(null,true)
}else{
   return cb(appError.create("this must be an image",400),false)
}
}


 const upload=multer({
   storage:diskStorage,
   fileFilter:fileFilter

 })
 
    router.route('/test')
    .get(verifyToken,usersController.getALLusers)

    router.route('/register')
    .post(upload.single('avatar'),usersController.register)
    
    router.route('/login')
    .post(usersController.login)
    



    module.exports=router


    
