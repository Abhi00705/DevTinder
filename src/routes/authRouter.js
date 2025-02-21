 const express = require('express');
 const router = express.Router();
 const User = require('../models/user.js');
 const {validateSignupData, validateForgetPassword} = require("../utils/validation.js");
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const {auth} = require('../middleware/Auth.js');
 const ConnectionRequestModel = require("../models/connectionRequest.js")

// router.use(express.json());
// router.use(cookieParser());

router.post("/signup", async(req, res) => {
    try{
        console.log("above validate");
        validateSignupData(req);
       
        const{firstName, lastName, emailId, password}= req.body;
        
        const hashPassword =  await bcrypt.hash(password, 10);
       
        const user = new User({
            firstName,
            lastName,
            emailId: emailId.toLowerCase(),
            password: hashPassword,
            
        });
        
        const saveUser = await user.save();
        const token = await saveUser.getJWT();
        console.log(' validation');
        res.cookie("token",token);
        console.log(saveUser);
        res.json({
            message:"user saved sucessfully!",
            data:saveUser,
        });

    }catch(err){
        res.status(400).send("Error check : "+ err.message);
    }
 })

router.post("/login", async (req, res) => {
    // console.log("checking ");
    try{
        const{emailId, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword);
        if(!emailId && !password){
            throw new Error("invalid input!");
        }
        
        const userData = await User.findOne({emailId: emailId.toLowerCase()});
       
        if(!userData.emailId){
            throw new Error("invalid input!");
        }
        const isValidPassword = await bcrypt.compare(password, userData.password);
        // console.log('checking '+ isValidPassword);
        if(isValidPassword){
            const token = await userData.getJWT();
            res.cookie('token', token);
            res.send(userData);
        }else{

            res.status(400).send("invalid input!"); 
        }
    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})

router.get("/logout", async(req, res) =>{
    
    try{
        res.cookie("token", null, {expires:new Date(Date.now())});
        res.send("logout sucessfully!");

    }catch(err){
        throw new Error("Error : "+ err.message);
    }
});

router.patch("/forgetPassword", auth, async(req, res)=>{
   
    try{
       
        if(!validateForgetPassword(req)){
            throw new Error("invalid input!");
        }
        console.log('checking');
        const isValidPassword = await bcrypt.compare(req.body.oldPassword, req.user.password);
        // console.log(isValidPassword);
        if(!isValidPassword){
            throw new Error("invalid password!");
        }
        const hashOldPassword = await bcrypt.hash(req.body.newPassword, 10);
        // console.log(hashOldPassword);
        req.user.password = hashOldPassword;
        // console.log(req.user.password);
        await  req.user.save();
        res.send("password updated!");
    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
});

router.post("/request/review/:status/:requestId", auth, async(req, res) => {
    try{
        const loggedInUser = req.user;
        
        const{status, requestId} = req.params; 
      
        const allowedStatus = ["accepted", "rejected"];
        const isAllowedStatus = allowedStatus.includes(status);
        //checking : is allowed status 
       
        if(!isAllowedStatus){
            return res.status(400).json({
                message:"connection request not found!"
            })
        }
       
        //not verfy fromUser is logged in or not
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
       
        if(!connectionRequest){        
            return res.status(400).json({
                message: "Connection request not found" 
            });
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request "+status,
            data
        })

    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})

 module.exports = router;