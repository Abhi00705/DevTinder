const express = require('express');
const profile = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {auth} = require('../middleware/Auth');
const {validateProfileEdit} = require('../utils/validation');

profile.get('/profile', async (req, res)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("invalid token");
        }
        const decodeMessage = await jwt.verify(token, "Dev@Tinder123");
        if(!decodeMessage){
            throw new Error("invalid token")
        }
        const {_id} = decodeMessage;
        const userData = await User.findById(_id);
        if(!userData){
            throw new Error("invalid token");
        }
        res.send(userData);


    }catch(err){
        res.status(400).send('Error: '+ err.message);
    }
})

profile.patch('/profile/edit',auth, async (req, res) =>{
    
    try{
        if(!validateProfileEdit(req)){
            throw new Error("invalid edit request!");
        }
        
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {

            return (loggedInUser[key] = req.body[key])
        });
        console.log("checking");
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, your profile undated successfuly`);

    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
});

module.exports = profile;