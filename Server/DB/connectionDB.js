
import mongoose from 'mongoose'
const connectdb=async(dbName)=>{
    try{
        const conn = await mongoose.connect("mongodb+srv://docqreaches:GTEvYCLd9v1SXaj0@cluster0.yqoz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        const db = dbName ? conn.connection.useDb(dbName) : conn.connection.db;
        console.log(`MongoDB connected to database: ${dbName || 'default'}`);
        return db; 
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectdb
