import mongoose from 'mongoose';
export const connect = async(req,res)=>{
    await mongoose.connect('mongodb://localhost:27017/chatApp',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB is connected");
}