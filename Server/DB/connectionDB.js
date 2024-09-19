
import mongoose from 'mongoose'
const connectdb=async()=>{
    try{
        const mongoURI = process.env.MONGODB_URI;
        await mongoose.connect(mongoURI)
        console.log("MongoDB connected")
    }
    catch(error){
        console.log(error)
    }
}

export default connectdb
