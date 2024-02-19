const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task.controller')

router.post('/task', taskController.createTask)
router.get('/task', taskController.readTask)
router.patch('/task/:id', taskController.updateTask)
router.delete('/task/delete/:id', taskController.deleteTask)

module.exports = router
