const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')
const taskController = require('../controllers/task-controller')
const loginController = require('../controllers/login-controller')

router.get('/user/:id', userController.getUserId)

router.delete('/user/:id', userController.deleteUser)

router.post('/user', userController.createUser)

router.post('/login', loginController.login)

router.get('/users', userController.getUserAll)

router.put('/user/:id', userController.editUser)


router.get('/task/:id', taskController.getTaskId)

router.delete('/task/:id', taskController.deleteTask)

router.post('/task', taskController.createTask)

router.get('/tasks', taskController.getTaskAll)

router.put('/task/:id', taskController.editTask)


module.exports = router