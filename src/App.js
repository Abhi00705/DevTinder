//starting file of our app
//importing express
const express = require('express');
//creating new web server
const app = express();
//handling request
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

{
    //some routing pattern

    //in this i can wite any number of b but any thing else
    // app.get("/ab+c", (req, res)=>{
    //     res.send("some usefull patter of routing!");
    // })

    //in this i can write anything inplace of *
    // app.get("/ab*c", (req, res)=>{
    //     res.send("routing ab*c");
    // })

    //here a(optional)?c
    // app.get("/a(bc)?d", (req, res)=>{
    //     res.send("a(bc is optional)?d");
    // })

    //rejex
        //1. /a/ it check 'a' must be present  else any text can also be present
        // app.get(/a/, (req, res)=>{
        //     res.send("/a/ rejex using");
        // })

         //2. /.*fly$ is mean any text must end with fly
        // app.get(/.*fly$/, (req, res)=>{
	    //     res.send("flying");
        // })

        //geting id and password from api
        // app.get("/user", (req, res)=>{
        //     console.log(req.query);
        //     res.send("getting id and password")
        // })

        //getting dynamic data
        app.get("/user/:userID/:name/:password", (req, res) =>{
            console.log(req.params)
            res.send("dynamic routing!");
        })
}
//server start listing request
app.listen(7777, () => {
    console.log("server is sucessfully listing on this port!777")
});
