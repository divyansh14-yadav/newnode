import express from 'express'
import mongoose from 'mongoose'
import * as path from 'path'
import bcrypt from 'bcrypt'
import  Jwt  from 'jsonwebtoken'
import checkAuth from '../middleware/check-auth.js'
import Auth from '../models/auth.js'
// import { BlockList } from 'net'
// import authtoken from 'authtoken'

const authrouter=express.Router()


//....................................USER REGISTER START.............................................................................................
// authrouter.post("/register",(req,res,next)=>{
//     bcrypt.hash(req.body.password,10,(err,hash)=>{
    
//         if(err)
//         {
//             return res.status(500).json({
//                 error:err
//             })
//         }
//         else
//         {
//             const user= new Auth({
//                 _id: new mongoose.Types.ObjectId,
        
//                 email:req.body.email,
//                 password:req.body.hash,
                // type:req.body.type,
                // status:req.body.status
    //         })
    //         user.save()
    //         .then(result=>{
    //             res.status(200).json({
    //                 new_user:result
    //             })
    //         })
    //         .catch(err=>{
    //             res.status(500).json({
    //                 error:err
    //             })
    //         })
    //     }
    // })
    

    // })


authrouter.post("/post1", async (req, res) => {

    const user= new Auth({
                         _id: new mongoose.Types.ObjectId,
                         name:req.body.name,
                         email:req.body.email,
                         password:req.body.password,
                          type:req.body.type,
                        status:req.body.status
                     })
                     user.save()
                     .then(result=>{
                         res.status(200).json({
                             new_user:result
                         })
                    })
// .catch(err=>{
//     res.status(500).json({
//         error:err
//     })
})




//....................................USER REGISTER END.............................................................................................
  

//.................USER LOGIN START.................................................................................................................
authrouter.post('/login',(req,res,next)=>{

    Auth.find({email:req.body.email})
    .exec()
    .then(user=>{

        if(user.length < 1)
        {
            return res.status(401).json({
                msg: 'user not found'
            })
        }
        if(user.status==1)
        {
            return res.status(401).json({
                msg:'user is blocked'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

            if(!result)
            {
           return res.status(401).json({
                    msg: 'not match'
                })
            }
            if(result)
            {
                const token = Jwt.sign({

                email:user[0].email,
                
            },
                'i am markand',
                {
                    expiresIn:"24h"
                }
                )
                res.status(200).send("yes logged in")
            }
        })
    })
    .catch(err=>{
        res.status(500).send("no logged in")
    
    })
})
//.................USER LOGIN END.................................................................................................................


authrouter.put("/login/:id", (req, res) => {
    // Auth.findOne({status: req.params.status}, function (err, data) {
    //   if (err){
    //     res.status(500).send(err)
    // } else{ 
    //   if( req.body.blocked == 0 ){
    //     req.body.blocked = 1}
    //   if( req.body.blocked == 1 ){ 
    //     data.blocked = 0 } }
    //       res.status(200).json({success :true ,message: data}) 
      
    // })
    var condition_obj={"id":req.body.id}
    if(req.body.id=="")
      {
        Auth.updateOne(condition_obj,{$set:{status:'0'}},(err,result)=>{
         res.send("blocked")
        })
      }
      else if(req.body.id=="")
      {
        Auth.updateOne(condition_obj,{$set:{status: 1}},(err,result)=>{
            res.send("unblock")
           })
           
      }
      else
      {
        Auth.remove(condition_obj,(err,result)=>{
           res.send("remove")
           })
      }

    })


//   authrouter.put("/login/:name", (req, res) => {
//     registerschemamodel.findOne({id: req.params.id}, function (err, data) {
//       if (err){
//         res.status(500).send(err)
//     } else{ 
//       if( data.blocked == 1 ){
//         data.blocked = 2}
//       if( data.blocked == 1 ){ 
//         data.blocked = 2 } }
//           res.status(200).json({success :true ,message: data}) 
      
//     })
//   })


// authrouter.put("/logout", authtoken, function (req, res) {
//     const authHeader = req.headers["authorization"];
//     Jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
//     if (logout) {
//     res.send({msg : 'You have been Logged Out' });
//     } else {
//     res.send({msg:'Error'});
//     }
//     });
//     });
  




export default authrouter;