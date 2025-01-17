

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

module.exports = {
    AdminAuth,
}