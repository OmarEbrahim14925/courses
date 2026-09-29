
const {validationResult}= require('express-validator')
const Course=require('../models/courses.model')
const { json } = require('express')
//const { asyncWrapper } = require('../routes/middleware/asyncWrapper')
const appErorr=require('../utlis/appError')
const asyncWrapper = require('express-async-handler')

const getALLcourses=asyncWrapper(async(req,res)=>{
const query=req.query
const limit=query.limit || 2
const page=query.page || 1
const skip=(page-1)*limit


    const courses=await Course.find({/*qeury fillter */},{"__v":false}).limit(limit).skip(skip)
        res.json({status:"success",data:{courses}})
    })

    const getONEcourse=asyncWrapper( 
        async(req,res,next)=>{
        // const courseId=+req.params.courseId
        // const course=courses.find((c)=>c.id===courseId)

      
         const course =await Course.findById(req.params.courseId)
        if(!course){
            
         const erorr=appErorr.create("course not found",404,"fail")
           return next(erorr)
        }
       return res.json({status:"success",data:{course}})
    })


    const addcourse=asyncWrapper(async(req,res,next)=>{
      
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            const erorr=appErorr.create(errors.array(),400,"fail")
          return next(erorr)
        }
        const newCourse=new Course(req.body)
        await newCourse.save()
        res.json(newCourse)
        
    })

    const updatecourses=asyncWrapper(async(req,res)=>{
       const updatedcourse=await Course.updateOne({_id:req.params.courseId},{$set:req.body},{"__v":false})
        res.json(updatedcourse)
    })

    const deletecourses=asyncWrapper(async(req,res)=>{
            // const courseId=+req.params.courseId
            // courses=courses.filter((c)=>c.id!=courseId) //  بنعمل اراي جديده
const course=await Course.deleteOne({_id:req.params.courseId})

            res.status(200).json({message:true})
        })

        module.exports={
            getALLcourses,
            getONEcourse,
            addcourse,
            updatecourses,
            deletecourses

        }
