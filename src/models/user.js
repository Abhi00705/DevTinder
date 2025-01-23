const mongoose = require("mongoose");
var validator = require('validator');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/,
        
    },
    lastName: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]+$/, 
        
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
        enum:{
            values:['male','female','other'],
            message:`{VALUE} is not a valid gender type`,
        },
        default: "difficult gender is other",
        
    },
    photoURL: {
        type: String,
        // default:'https://imgs.search.brave.com/sHfS5WDNtJlI9C_CT2YL2723HttEALNRtpekulPAD9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzMzLzU0Lzc4/LzM2MF9GXzYzMzU0/Nzg0Ml9BdWdZemV4/VHBNSjl6MVljcFRL/VUJvcUJGMENVQ2sx/MC5qcGc'
    },
    about: {
        type:String,
        maxLength:200,
        // default: "This is a default whole",
    },
    skills: {
        type: [String],
        maxLength:10
    },
   
    
},
{ timestamps: true }
);

userSchema.methods.getJWT = async function (){
    console.log("in getJWT");
    const user = this;
    const token = await jwt.sign({_id:user._id}, "Dev@Tinder123", {/*expiresIn  */});
    return token;
}


module.exports = mongoose.model("User", userSchema);
 