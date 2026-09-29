const bodyParser = require('body-parser')
const express=require('express')
const app=express()
app.use(bodyParser.json())//or app.use(express.json)body.parser كدا كدا موجوده جوا الاكسبريس
// ال body parser دي اللي بستلم بيها الداتا الجديده في بوست عشان تحولي الكلام الجاي ل ابوجيكت اقدر اتعامل معاه 
const {body,validationResult}= require('express-validator')

//the express validator هو اللي بيخليني اعمل الشرؤوط بتاعتي في الميدل وير بتاع البوست

//let {courses}=require('./data/courses')

//الطريقه العاديه
 
// const {MongoClient}=require('mongodb')
// const url="mongodb+srv://omare954785_db_user:Omardb.learn@learn-mongo-db.feomlsz.mongodb.net/?appName=learn-mongo-DB"
// const client = new MongoClient(url)
// const main=async()=>{
//     //connect to data base
//     await client.connect();
//     console.log("conected success")
// //بختار الداتا بيز اللي هاخد منخا داتا
// const db=client.db('code-zone')
// //بختار الكوليكشن اللي جوا الداتا بيز
// const collection=db.collection('courses')
// // هنا بعمل فايند جوا الكوليكشن وبقوله حولهملي ل اراي
// //get all courses
// const data = await collection.find().toArray()
// console.log("data", data)
// }
// main();



//with mongoose
const path=require("path")
app.use(express.static(path.join(__dirname,'uploads')))//dirname  دا المسار بتاع الفولدر اللي فيه الملف اللي انا غاتحه فا بقوله ادمجه مع الاب لودز
const mongoose = require('mongoose')
require('dotenv').config()
const url=process.env.MONGO_URL

const main=async()=>{
await mongoose.connect(url)
console.log("connect suuccessfully")
}
main();



const coursesrouter=require('./routes/courses.route')
const usersrouter=require('./routes/users.route')
const { statusCode } = require('./utlis/appError')

  app.use('/api/courses',coursesrouter)
  app.use('/api/users',usersrouter)

  //global middleware for not found route في حاله ان جالنا راوت مش موجود في البيز
  app.all('*wildcard',(req,res,next)=>{
return res.status(404).json({status:"fail",message:"the resource is not available "})
  })

  //global error handeler بيتعامل مع ايرور جاي من النيكست
  app.use((error,req,res,next)=>{//name:error handling middleware take 4 params
res.status(error.statusCode ||500).json({status:error.statusText||"erorr",message:error.message,code:error.statusCode || 500,data:null})
  })

   
app.listen(process.env.PORT||5003,()=>{
    console.log("listening on port 5003")
})