import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }               
});

const userModel = mongoose.model('user',userSchema); //isme user collection name hai aur userSchema to use hi kr rha hai 

export default userModel;