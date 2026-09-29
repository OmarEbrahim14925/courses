const mongoose=require('mongoose')
const validator=require('validator')
const usersSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
    required:true
},
email:{
type:String,
    required:true,
    unique:true,
    validate:[validator.isEmail," valid email address "]
},
password:{
    type:String,
    required:true
},
token:{
    type:String
},
role:{
    type:String,
    enum:["USER","ADMIN","MANEGER"], //دي القيم اللي واحده منهم هتيجي فالاسترينج
    default:"USER" // القيمه الديفالت عشان لو كجاليش حاجه 
},
avatar:{
    type:String,
    default:"../uploads/profile.png"
}

})
module.exports=mongoose.model('User',usersSchema)