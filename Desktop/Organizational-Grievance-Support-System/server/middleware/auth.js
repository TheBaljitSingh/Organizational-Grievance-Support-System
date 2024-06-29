const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

exports.isAuthenticatedUser = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message: "Please login to access this resource"});
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
}

exports.authorizeRoles = (...rolex)=>{
    return (req, res, next)=>{
        console.log(req.user.role);
        if(!roles.includes(req.user.role)){
            return req.status(400).json({message: `Role: ${req.user.role} is not allowed to access this resource`});
        }

        next();
    }

}