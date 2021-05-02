const mongoose = require('mongoose')

const CountTemplate = new mongoose.Schema({
    count:{
        type: Number,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('countFace', CountTemplate)