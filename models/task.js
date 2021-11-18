var {model, Schema, Mongoose} = require("mongoose")

var TaskSchema = Schema ({

    title: String, 
    description: String, 
    status:{
        type: Boolean, 
        default: false
    }
})

module.exports = model('tasks',TaskSchema)