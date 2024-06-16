const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.isAdmin=(req,res,next)=>{
    try {
        const token = req.body.token || req.headers.authorization
        if(!token || token ===undefined){
            return res.status(300).json({
                message:'Invalid token'
            })
        }
        const payload= jwt.verify(token, process.env.SECRET_KEY)
        if(payload.role==="Admin"){
            next()
            
        }
    } catch (error) {
        return res.status(400).json({
            message:'something went wrong'
        })
    }   
}

exports.isStudent=(req,res,next)=>{
    try {
        const token = req.body.token || req.headers.authorization
        if(!token || token ===undefined){
            return res.status(300).json({
                message:'Invalid token'
            })
        }
        const payload= jwt.verify(token, process.env.SECRET_KEY)
        if(payload.role==="Student" ){
            next()
            
        }
    } catch (error) {
        return res.status(400).json({
            message:'something went wrong'
        })
    }
   
}