const mongoose = require("mongoose");
var validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        validate(value){
            if(!(/^[a-zA-Z]+/.test(value))){
                throw new Error("Name is not correct!");
            }
        }
    },
    lastName: {
        type: String,
        validate(value){
            if(!(/^[a-zA-Z]+/.test(value))){
                throw new Error("Name is not correct!");
            }
        }
    },
    emailID: {
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        // validate(value){
        //     if(!(value.includes("@gmail.com"))){
        //         throw new Error("gmail is not correct!");
        //     }
        // },
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid email!")
            }
        }

    },
    password: {
        type:String,
        minLength:8,
        // maxLength:8,
        validate(value){
            const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
            if(!(strongRegex.test(value))){
                throw new Error("Not strong password!");
            }

        }
        
    },
    age:{
        type:Number,
        min:18,
        // max:25,
        
    },
    gender: {
        type:String,
        default: "difficult gender is other",
        Validate(value){
            const gen = ["male", "female", "other"];
           if(! (gen.includes(value.toLowerCase()))){
            throw  new Error("Gender data is not valid");
           }
        },
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
 