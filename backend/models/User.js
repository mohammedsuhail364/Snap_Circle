const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    userName:String,
    userEmail:String,
    password:String,
    role:String,
    dob:Date,
    gender:String,
    profilePicture:String,
    contactNumber:String,
    address:String,
    myAppointments:[], 
     
})
module.exports=mongoose.model('User',UserSchema)