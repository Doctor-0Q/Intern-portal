
import mongoose from 'mongoose'
const connectdb=async()=>{
    try{
        await mongoose.connect("mongodb+srv://docqreaches:GTEvYCLd9v1SXaj0@cluster0.yqoz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB connected")
    }
    catch(error){
        console.log(error)
    }
}

export default connectdb
