var express = require("express");
var app = express();

app.get("/", (req,res)=>{
//res.send("Bienvenido a Admin")

var items = [
    {name:'node.js',url:'https://nodejs.org/en/'},
    {name:'ejs',url:'https://ejs.co'},
    {name:'expressjs',url:'https://expressjs.com'},
    {name:'vuejs',url:'https://vuejs.org'},
    {name:'nextjs',url:'https://nextjs.org'},
    {name:'Amazon',url:'https://amazon.com'}
];

var isAdmin = false;

res.render("pages/admin", {title: "Admin", items,isAdmin})
})

app.get("/altas", (req,res)=>{
res.send("Bienvenido a Admin/Altas")
})

app.get("/bajas", (req,res)=>{
    res.send("Bienvenido a Admin/Bajas")
    })


module.exports = app;