 const express=require('express')
 const router=express.Router()
 const verifyToken=require('../routes/middleware/verifyToken')
 const allowedTo=require("./middleware/allowedTo")
 const coursecontroller=require('../controllers/courses.controller')
 

const {validation}=require('./middleware/courses.middleware')

    router.route('/')
    .get(verifyToken,coursecontroller.getALLcourses)
    .post(verifyToken,validation() ,coursecontroller.addcourse
   ) 
    
    router.route('/:courseId')
    .get(verifyToken,coursecontroller.getONEcourse)
    .patch(verifyToken,coursecontroller.updatecourses)
    .delete(verifyToken,allowedTo("ADMIN","MANEGER"),coursecontroller.deletecourses)
    module.exports=router
    

    

    
    

     

    