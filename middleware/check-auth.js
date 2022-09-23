import express from 'express'
import  Jwt  from 'jsonwebtoken'
import authrouter from '../routes/auth.js'

const checkauth=(req,res,next)=>{
    
    try{
const token= req.headers.authorization.split(" ")[1]
//  console.log(token)
const verify = Jwt.verify(token,'i am markand')

// if(verify.type=='admin')
// {
//     next()
// }
// else
// {
//     return res.status(401).json({

//         msg: 'only access admin'
//     })
// }
next()

    }
    catch(error)
    {
        return res.status(401).json({
            msg: 'only access admin'
        })
    }
} 
export default checkauth;