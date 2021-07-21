var express = require("express");
var app = express();

app.get("/characters", (req,res)=>{
    res.send("Bienvenido a characters")
})

module.exports = app;