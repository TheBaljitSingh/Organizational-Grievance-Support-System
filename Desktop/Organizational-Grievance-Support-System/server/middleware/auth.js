const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
const dotenv = require("dotenv");
dotenv.config({path:"../config/config.env"});


exports.isAuthenticatedUser = async(req, res, next)=>{
   
    
    try {
        const {token} = req.cookies; // Assuming token is sent in the Authorization header
    
        if(!token){
    
            return res.status(401).json("Bhai pahale Login to to kar, ye access karne ke liyea");
            // next("bhai pahale login to kar");
        }

        console.log("token ko print kar raha hu"+token);      
    
        
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        // console.log(token.substring(6));

        authUser =  await User.findById(decodedData.id);
    
        if(!authUser){
            return res.status(401).json("Invalid Token");
        }
    
        req.user = authUser;
        // Now you can access the authenticated user in your routes using req.user
    
        console.log(decodedData);
    
    
        next();
    } catch (error) {
        console.log(error);
        return next(error);
        
    }
}

exports.authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        console.log(req.user.role);
        if(!roles.includes(req.user.role)){
            return req.status(400).json({message: `Role: ${req.user.role} is not allowed to access this resource`});
        }

        next();
    }

}