const mongoose = require('mongoose')
const studySessionSchema = new mongoose.Schema({
    minutes: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sessionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String
    },
    subject: {
        type: String
    }

})
    

module.exports = mongoose.model('studySession', studySessionSchema)
