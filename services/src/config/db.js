import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectDB =async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log('Connected to MongoDB')
    }catch(err){
        console.log(err)
    }
}

export default connectDB;