 const express = require('express');
 const router = express.Router();
 const User = require('../models/user.js');
 const {validateSignupData, validateForgetPassword} = require("../utils/validation.js");
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const {auth} = require('../middleware/Auth.js');

// router.use(express.json());
// router.use(cookieParser());

router.post("/signup", async(req, res) => {
    try{
        console.log("above validate");
        validateSignupData(req);
        console.log('below validation');
        const{firstName, lastName, emailId, password,age, gender, photoURL, about, skills}= req.body;
        const hashPassword =  await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId: emailId.toLowerCase(),
            password: hashPassword,
            age,
            gender,
            photoURL,
            about,
            skills,
        });

        await user.save();
        res.send("user saved sucessfully!");

    }catch(err){
        res.status(400).send("Error check : "+ err.message);
    }
 })

router.post("/login", async (req, res) => {
    
    try{
        const{emailId, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        if(!emailId && !password){
            throw new Error("invalid input!");
        }
        
        const userData = await User.findOne({emailId: emailId.toLowerCase()});
       
        if(!userData.emailId){
            throw new Error("invalid input!");
        }
        const isValidPassword = await bcrypt.compare(password, userData.password);
        console.log('checking '+ isValidPassword);
        if(isValidPassword){
            const token = await userData.getJWT();
            res.cookie('token', token);
            res.send("login sucessfully!");
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


 module.exports = router;