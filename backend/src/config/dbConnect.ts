import mongoose from "mongoose";
import {config} from "dotenv";
config();

export const momngoDbConnect=async()=>{
    try {
        const URI=process.env.MONGO_URI||""
        mongoose.connect(URI).then(res=>{
            console.log("🟢 mongo db connected"+res.connection.host)
        });
    } catch (error) {
        console.log((error as Error).message)
        process.exit(1)
    }
}