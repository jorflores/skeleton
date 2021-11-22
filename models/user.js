// # 1
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


// # 2
var UserSchema = Schema ({
    email: String,
    password: String
    }
);


// # 3
module.exports = mongoose.model('users', UserSchema);
