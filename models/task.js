var {model, Schema, Mongoose} = require("mongoose")

var TaskSchema = Schema ({

    title: String, 
    description: String, 
    status:{
        type: Boolean, 
        default: false
    },
    user_id: String
})

module.exports = model('tasks',TaskSchema)