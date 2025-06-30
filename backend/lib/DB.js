import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDB=async()=>{
   try{ 
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
   
}catch(err){
    console.log(err.message);
    // process.exit(1);
   }
}

