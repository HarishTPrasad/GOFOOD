const mongoose = require('mongoose');

const {Schema } = mongoose;

const userSchema = new Schema({
    name :{
        type: String,
        isRequired:true
    },
    location:{
        type: String,
        isRequired:true
    },
    email:{
        type: String,
        isRequired:true
    },
    password:{
        type: String,
        isRequired:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('user', userSchema)