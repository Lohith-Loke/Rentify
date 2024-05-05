import express from "express"
import { configDotenv } from "dotenv"
import mongoose from "mongoose"
import Credentials from "./Models/credentials.js"


configDotenv()

mongoose.connect(process.env.MONGODBURI).catch(()=>{
    console.log("DB connection failed")
})


const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    console.log(req.body)
    res.send("hello word")
})

const server=app.listen(process.env.PORT||8080,()=>{
    console.log(`express is running on http://localhost:${server.address().port}`);
})

console.log(" all ok ")
