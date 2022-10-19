
const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    taskid: {
        type: Number,
        required: true,
        unique: true
    },
    task: {
        type: String ,
        required: true,
    },
    importance: {
        type: String ,
        required: true,
    }
})

module.exports = mongoose.model('Task', taskSchema)