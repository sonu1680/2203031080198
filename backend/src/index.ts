import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import router from "./route/linkRoute";

dotenv.config();
const URI = process.env.DATABASE_URL || "";
const PORT=process.env.PORT||4000;
const app=express()

app.use(express.json())
app.use(cors())
app.use("/api/v1", router);
app.use("/", router); 

mongoose.connect(URI).then(()=>{
  app.listen(PORT,()=>{
  console.log(`Server is listenong at ${PORT}`)
  })
})