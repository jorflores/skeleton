var express = require("express");
var app = express();

app.get("/", (req,res)=>{

/*
logica para obtener el nombre del usuario BD
*/
var user = "Karina";

    res.render('pages/home', {title:'Home2',usuario: user  })
//res.send("Bienvenido a Home")

})

module.exports = app;