import mongoose from "mongoose";

export const initializeDatabase = async() => {
    try{
        const MONGO_URI = process.env.MONGO_URI
        await mongoose.connect(MONGO_URI)
        console.log("Connected to DB")
    }catch(error){
        console.log("unable to connect to db")
    }
}