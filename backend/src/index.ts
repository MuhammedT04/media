import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/user";
import cookieParser from "cookie-parser";
import path from "path";  
import cors from "cors";
dotenv.config();

const app = express();
 
mongoose.connect("mongodb://127.0.0.1:27017/Media");
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "config/uploads")));

app.use(express.json());

app.use(cookieParser())

app.use(express.urlencoded({extended:true}))


app.use(cookieParser())
app.use("/api/auth", router);
app.listen(process.env.PORT, () => {
  console.log("running");
});

