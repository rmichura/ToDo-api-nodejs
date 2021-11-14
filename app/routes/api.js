const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')
const taskController = require('../controllers/task-controller')

router.get('/user/:id', userController.getUserId)

router.delete('/user/:id', userController.deleteUser)

router.post('/user', userController.createUser)

router.get('/users', userController.getUserAll)

router.put('/user/:email', userController.editUser)


router.get('/task/:id', taskController.getTaskId)

router.delete('/task/:id', taskController.deleteTask)

router.post('/task', taskController.createTask)

router.get('/tasks', taskController.getTaskAll)

router.put('/task/:id', taskController.editTask)


module.exports = router