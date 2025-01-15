//starting file of our app
//importing express
const express = require('express');
//creating new web server
const app = express();
//handling request
//handle different request differently
app.use("/test",(req, res) => {
    res.send("Hello from the server!");
})
//handleing  requst from /hello 
app.use("/hello",(req, res) => {
    res.send("hello hello hello");
})
//handle request form /
app.use("/",(req, res) => {
    res.send("allhello123");
})
//server start listing request
app.listen(7777, () => {
    console.log("server is sucessfully listing on this port!777")
});
