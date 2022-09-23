//  import express from 'express'
// // import dotenv from 'dotenv'
// import userrouter from './routes/user.js'

// // import cors from "cors";
// import mongoose from 'mongoose'


// // dotenv.config()

// const app = express()

// const PORT = process.env.PORT || 3000

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// // app.use(cors())

// app.use("/",userrouter)



// mongoose.connect("mongodb+srv://project:project@cluster0.nahdsvl.mongodb.netproject/?retryWrites=true&w=majority"
// ).then(()=>{
//     console.log("connected to mongodb")

// })


// .then(() => {

//     console.log("connect to mongodb");


// })



// app.listen(PORT, () => {

//     console.log("server start at port", PORT);
// })


import  express  from "express";
import mongoose from "mongoose";

const app=express();
const PORT=process.env.PORT||3000

mongoose.connect("mongodb+srv://dev:dev@cluster0.egwxv3u.mongodb.net/devdb?retryWrites=true&w=majority").then(()=>{
    console.log("connected to mongodb atlas")
})


app.listen(PORT,()=>{
    console.log("server started at port 3000");
})