const validator = require("validator");



 const  validateSignupData = (req) =>  {
    const pattern = /^[a-zA-Z\-' .]+$/;
    

    const {firstName, lastName,emailId, password,} = req.body;
// console.log(firstName, lastName, emailId, password,gender);
    if( !(validator.isEmail(emailId)) ){
        throw new Error("Invalid email!");
    }
    else if( !(validator.isStrongPassword(password)) ){
        throw new Error("Weak password!");
    }
    else if(!firstName && pattern.test(firstName)){
        throw new Error("invalid firstName");
    }
    else if(!lastName && pattern.test(lastName)){
        throw new Error("invalid lastName");
    }
    // else if( !(['male', 'female', 'other'].includes(gender))){
    //     throw new Error("invalid gender");

    // }else if(!(validator.isURL(photoURL))){
    //     throw new Error("invalid url");
    // }
    console.log( "All validations passed!" ); 
    
    
}

const validateProfileEdit = (req) => {
    
   const allowedEditFields = [
    'firstName',
    'lastName',
    'age',
    'gender',
    'photoURL',
    'about',
    'skills',
   ];
   
   const isEditAllowed = Object.keys(req.body).every((field) =>allowedEditFields.includes(field));
   console.log(isEditAllowed);
   return isEditAllowed;

}

const validateForgetPassword = (req) => {
    
    const forgetCridencial = [
        'emailId',
        'oldPassword',
        'newPassword',
        
    ]
    
    const isForgetCridencial = Object.keys(req.body).every((field)=> (forgetCridencial.includes(field)))
    
    return isForgetCridencial;
}
module.exports = {validateSignupData, validateProfileEdit, validateForgetPassword, };