const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

 const AdminAuth = (req, res, next)=>{
    const token = "abc";
    const isAdmin = token === "abc";
    if(!isAdmin){
        res.status(404).send("unauthorize request!");

    }
    else{
        next();
    }
}
const auth = async (req, res, next) =>{
    try{
        const cookies = req.cookies;
        const {token } = cookies;
        if(!token){
            throw new Error("invalid token!");
        }
        const decodeMessage = await jwt.verify(token, "Dev@Tinder123");
        const{_id} = decodeMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("user not found!");
        }
        req.user = user;
        next();
    }catch(err){
        throw new Error("Error: "+ err.message);
    }
}
module.exports = {
    AdminAuth,auth,
}