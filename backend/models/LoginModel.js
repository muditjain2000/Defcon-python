const mongoose = require('mongoose')

const loginTemplate = new mongoose.Schema({
    
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    
})

module.exports = mongoose.model('myFirstDatabase', loginTemplate)