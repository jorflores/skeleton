// # Dependencias
var express = require("express");
var morgan = require("morgan");
var mongoose = require('mongoose');
var dotenv = require("dotenv");

dotenv.config()

var app = express();

// Connection to MongoDB



// Middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// importing routes
const indexRoutes = require('./routes/indexroutes');

// Routes
app.use('/', indexRoutes);


app.listen(process.env.PORT,() =>{
   console.log(`Server running on port  ${process.env.PORT}`) 
} )


