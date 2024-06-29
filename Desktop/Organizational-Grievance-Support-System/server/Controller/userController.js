const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


exports.registerUser = async (req, res)=>{
    const {name, email, password} = req.body;

    const alreadyExist = await User.findOne({email});
    if(alreadyExist){
        return res.status(400).json({message:`User already exist with this ${email}`})
    }

    const user = await User.create({
        name, email, password,
        avatar:{
            public_id:"this is sample id",
            url:"profileUrl"
        },

    })
    sendToken(user, 201, res);
}

exports.loginUser = async (req, res)=>{
    try{

        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({message: "Please Enter Email and Password"});
        }
        
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({ success: false, message: "Invalid email or password" });
            
        }
        
        const isPasswordMatched = await user.comparePassword(password);
        console.log("login  wal user ke details: "+user.email);
        
        sendToken(user, 200, res);
    }
    catch(error){
        next(error);
    }
}
exports.logoutUser = async(req, res, next)=>{

    let {token} = req.body;
    // console.log(token.substring(6));

    // token.substring(6);

    res.cookie("token", null, { 
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });

}

exports.getUserDetails = async(req, ers)=>{
    console.log(`hello ${req.user.name}, how are you`);

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
    
}

//get single ueer - admin

exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, error: `User not found with id: ${req.params.id}` });
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

//update userRole - admin
exports.updateUserRole = async (req, res) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true, 
            useFindAndModify: false 
        });

        if (!user) {
            return res.status(404).json({ success: false, error: `User not found with id: ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.error(err);

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }

        res.status(500).json({ success: false, error: 'Server Error' });
    }
};



