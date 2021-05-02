const mongoose = require('mongoose')

const detectionTemplate = new mongoose.Schema({
    detect:{
        type: Array,
        required:true
    },
    face:{
        type: String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('faceDetection', detectionTemplate)