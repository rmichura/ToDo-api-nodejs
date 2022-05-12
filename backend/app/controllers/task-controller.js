const Task = require('../db/models/task')
const mongoose = require('mongoose')

class TaskController {
    async createTask(req, res) {
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            user: req.body.user,
            done: req.body.done,
            text: req.body.text,
        });
        await task.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created task successfully',
                createdTask: {
                    _id: result._id,
                    user: result.user,
                    done: result.done,
                    text: result.text
                }
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    async editTask(req, res) {
        const { id } = req.params;
        const task = await Task.findById(id)
        if (req.body.done) task.done = req.body.done;
        if (req.body.text) task.text = req.body.text;

        await task.save().then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Edited task successfully',
                editedTask: {
                    _id: result._id,
                    done: result.done,
                    text: result.text
                }
            })
        }).catch(err => {
            console.log(err)
            res.status(422).json({
                error: err
            })
        })
    }

    async getTaskId(req, res) {
        const id = req.params.id;
        await Task.findById(id).then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    task: doc,
                })
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        }).catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }

    async getTaskAll(req, res) {
        await Task.find().then(docs => {
            const response = {
                count: docs.length,
                tasks: docs.map(doc => {
                    return {
                        _id: doc._id,
                        user: doc.user,
                        done: doc.done,
                        text: doc.text
                    }
                })
            }
            res.status(200).json(response);
        }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    }

    async getTaskQuery(req, res) {
        const query = req.query
        const task = await Task.find(query);

        res.status(200).json(task);
    }

    async deleteTask(req, res) {
        const id = req.params.id;
        await Task.deleteOne({_id: id})

        res.sendStatus(204);
    }
}

module.exports = new TaskController();