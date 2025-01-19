const validator = require("validator");

function genderValidate(value){
    ["male", "female", "other"].map((item)=>{
        if(item === value.toLowerCase()){
            return true;
        }
    })
    return false;
}

 const  validateSignupData = (req) =>  {
    console.log("above req.body");
    const {firstName, lastName, emailId, password, gender, skill, photoURL} = req.body;
    console.log("after req.body");
    if(!validator.isEmail(emailId)){
        throw new Error("Invalid email!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Weak password!");
    }else{
        console.log("after else-if");
    }
    
    // else if( !(skill.length < 10)){
    //     throw new Error("skill should less then 10!");
    // }
    // else if( !validator.isURL(photoURL)){
    //     throw new Error("Invalid Error!");
    // }
    
    
    // {
    //     // else if(!(/^[a-zA-Z]+/.test(firstName))){
    // //     throw new Error("first Name is not correct!");
    // // }
    // // else if(!(/^[a-zA-Z]+/.test(lastName))){
    // //     throw new Error("last Name is not correct!");
    // // }
    // // else if( !genderValidate(gender)){
    // //     throw new Error("gender should  amonge ['male', 'female', 'other']");
    // // }
    // }
    
}
module.exports = {validateSignupData,};