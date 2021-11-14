const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task