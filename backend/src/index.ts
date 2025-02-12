import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/user";
import cookieParser from "cookie-parser";
import path from "path";  
import cors from "cors";
import { momngoDbConnect } from "./config/dbConnect";
dotenv.config();

const app = express();

 
momngoDbConnect()
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

