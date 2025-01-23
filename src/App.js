//starting file of our app

const connectDB = require("./Config/database");
const express = require('express');
const User = require("./models/user");
const bcrypt = require("bcrypt");
const  {validateSignupData}  = require("./utils/validation.js");
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
const user = require("./models/user");
const cookieParser = require("cookie-parser");
const {auth} = require("./middleware/Auth.js");


//creating new web server
const app = express();


// const {AdminAuth} = require("./middleware/Auth");
//handling request
{
    // {
//     //handle different request differently
// app.use("/test ",(req, res) => {
//     res.send("Hello from the server!");
// })
// //handleing  requst from /hello 
// app.use("/hello",(req, res) => {
//     res.send("hello hello hello");
// })
// //handle request form /
// // app.use("/",(req, res) => {
// //     res.send("Abhishek kuamr");
// // })
// }

// {
//     //this will match all the HTTP method API call to /test
//     app.use("/user", (req, res) => {
//         res.send("using app.use");
//     })
//     //GET call
//     app.get("/user", (req, res) =>{
//         res.send({firstName:'Abhishek', lastName:'kumar'} )
//     })

//     //POST call
//     app.post("/user", (req, res)=>{
//         res.send("Data has been saved to the database sucessfully!");
//     })

//     //Delete call
//     app.delete("/user", (req, res)=>{
//         res.send("Data has been delete to the database sucessfully!");
//     })
// }

// {
//     //some routing pattern

//     //in this i can wite any number of b but any thing else
//     // app.get("/ab+c", (req, res)=>{
//     //     res.send("some usefull patter of routing!");
//     // })

//     //in this i can write anything inplace of *
//     // app.get("/ab*c", (req, res)=>{
//     //     res.send("routing ab*c");
//     // })

//     //here a(optional)?c
//     // app.get("/a(bc)?d", (req, res)=>{
//     //     res.send("a(bc is optional)?d");
//     // })

//     //rejex
//         //1. /a/ it check 'a' must be present  else any text can also be present
//         // app.get(/a/, (req, res)=>{
//         //     res.send("/a/ rejex using");
//         // })

//          //2. /.*fly$ is mean any text must end with fly
//         // app.get(/.*fly$/, (req, res)=>{
// 	    //     res.send("flying");
//         // })

//         //geting id and password from api
//         // app.get("/user", (req, res)=>{
//         //     console.log(req.query);
//         //     res.send("getting id and password")
//         // })

//         //getting dynamic data
//         app.get("/user/:userID/:name/:password", (req, res) =>{
//             console.log(req.params)
//             res.send("dynamic routing!");
//         })
// }
// {
// // app.use("/user", (req, res, next)=>{
// //     console.log("1st response!");
// //     next();
// //     //  res.send('1st response'); // it will remove then browser will wait for response
    

// // },
// // (req, res, next)=>{
// //     console.log("2nd response!");
// //     // res.send("2nd response!");
// //     next(); 
// // }
// // ,
// // (req, res, next)=>{
// //     console.log("3nd response!");
// //     // res.send("2nd response!");
// //     next();
// // }
// // ,
// // (req, res, )=>{
// //     console.log("4nd response!");
// //     // res.send("2nd response!");
// //     // next();
// // })
// }

// {
//     //Middleware
//     app.use("/admin", AdminAuth)
//     // app.use("/admin", (req, res, next) =>{
//     //     const token = "abc1";
//     //     const isAdmin = token === "abc";
//     //     if(!isAdmin){
//     //         res.status(404).send("unauthorize");
//     //     }
//     //     else{
//     //         next();
//     //     }
//     // })
//     app.get("/admin/getAllData", (req,res)=>{
//         res.send("get all data");
//     })
//     app.get("/admin/DeleteUser", (req,res)=>{
//         res.send("user deleted");
//     })

// }

}
//creating post api
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/authRouter.js');
const connectionRoute = require('./routes/connectionRouter.js');
const profile = require('./routes/profileRouter.js');



app.use('/', authRouter);
app.use('/', connectionRoute);
app.use('/', profile);



// app.get("/profile", auth, async(req, res) =>{
//     try{
//         res.send(req.user);
//     }catch(err){
//         res.status(400).send("Error: "+ err.message);
//     }
// })

// app.get("/sendConnection", auth, async(req, res) => {
//     try{

//         res.send("user connected send!");
//     }catch(err){
//         res.status(400).send("user connected!");
       
//     }
// })
connectDB()
.then(() =>{
    console.log("database connected!");
    app.listen(7777, () => {
        console.log("server is sucessfully listing on this port!777")
    });
})
.catch((error)=>{
    console.error("database not connected!");
});


