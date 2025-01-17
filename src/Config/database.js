const mongoose = require("mongoose");
const connectDB  = async ()=>{
    await mongoose.connect("mongodb+srv://abhishekkumarit6:IBWeG37vzB8g8Luu@cluster0.hbdc3.mongodb.net/DevTinder")

}
module.exports = connectDB;