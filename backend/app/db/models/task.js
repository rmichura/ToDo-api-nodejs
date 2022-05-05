const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    done: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task