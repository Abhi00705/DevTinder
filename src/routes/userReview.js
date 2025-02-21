const express = require("express");
const userRouter = express.Router();
const {auth} = require("../middleware/Auth")
const ConnectionRequest = require("../models/connectionRequest")
const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills";
const User = require("../models/user");

userRouter.get("/user/requests/review", auth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
        }).populate("fromUserId",["firstName", "lastName","photoURL","age", "gender", "about", "skills"]); //.populate("fromUserId", "firstName lastName")
        if(!connectionRequest){
            res.status(400).send("Request not found!");
        }
        res.json({
            message: "Data fetch sucessfully!",
            data: connectionRequest,
        })
    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})

userRouter.get("/user/connections", auth, async(req, res) =>{
    try{
        
        const loggedInId = req.user;
        
        const connectionRequests = await ConnectionRequest.find({
           
            $or: [
                {toUserId: loggedInId._id, status: "accepted"},
                { fromUserId: loggedInId._id, status: "accepted"},
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)
       
        console.log(connectionRequests);//real

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInId._id.toString()){   
                return row.toUserId;
            }
            return row.fromUserId; 
        })
        
        res.json({
            data:data,
            message:"showed connection data!" 
        }) 

    }catch(err){
        // console.log("check53", err.message);
        res.status(400).send({message: err.message});    
    }
})

userRouter.get('/user/feed', auth, async(req, res) => {
    
    try{
        const loggedInUser = req.user;
        
        const page = parseInt(req.query.page) || 1;
        
        var limit = parseInt(req.query.limit) || 10;
        
        limit = (limit > 50) ? 50 : limit;
        
        const skip = (page - 1) * limit;
       
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
            ]
        }).select("fromUserId toUserId");
        
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
     
        const users = await User.find({
            $and:[
                { _id: {$nin: Array.from(hideUserFromFeed)}},
                { _id: { $ne: loggedInUser._id}},
            ]
        }).select(USER_SAFE_DATA)
          . skip(skip)
          . limit(limit)

        res.send(users);


    }catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})
module.exports = userRouter;