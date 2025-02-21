const express = require('express');
const connectionRoute = express.Router();
const jwt = require('jsonwebtoken');
const {auth} = require("../middleware/Auth");
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

// connectionRoute.get('/connectionRequest', async (req, res)=>{
//     try{
//         const {token} = req.cookies;
//         if(!token){
//             throw new Error("invaid token");

//         }
//         const decodeMessage = await jwt.verify(token, "Dev@Tinder123", {expiresIn: '1d'});
//         if(!decodeMessage){
//             throw new Error("invalid token");
//         } 
//         res.send("connection Request send!");
//     }catch(err){
//         res.status(400).send("Error : "+ err.message);
//     }
// })

connectionRoute.post("/request/send/:status/:toUserId",auth, async(req, res) => {
try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    
    const allowedStatus = ["ignored" ,"interested"]; 
   
    if( !allowedStatus.includes(status)){
      
        res.status(400).json({
            message: "Invalid status type: "+ status
        });
    }
    
    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    });
    
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId, toUserId},
            {fromUserId: toUserId, toUserId: fromUserId},
        ],
    });
  
    if(existingConnectionRequest){
        res.status(400).json({
            message: "Connection Request Already Exists!!"
        });
    }
   
    const isRequestedUser = await User.findById(toUserId);
    if( !isRequestedUser){
        res.status(400).send("Requested user not found!")
    }

    const data = await connectionRequest.save();
  
    res.json({
        message:"Connection Request Sent Sucessfully",
        data,
    });
    
}catch(err){
    res.status(400).send("Error : "+ err.message);
}
})
module.exports = connectionRoute;