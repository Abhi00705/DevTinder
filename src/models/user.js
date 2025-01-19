const mongoose = require("mongoose");
var validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        
    },
    emailId: {
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
    },
    password: {
        type:String,
        minLength:8,
        // maxLength:8,
        
    },
    age:{
        type:Number,
        min:18,
        // max:25,
        
    },
    gender: {
        type:String,
        default: "difficult gender is other",
        
    },
    photoURL: {
        type: String,
        
    },
    about: {
        type:String,
        default: "This is a default whole",
    },
    skill: {
        type: [String],
    },
   
    
},
{ timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
 