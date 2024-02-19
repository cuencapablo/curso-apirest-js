const express = require('express')
const router = express.Router()
const TareaController = require('../controllers/tarea-controller')

router.get('/api/tareas', TareaController.getTareas)

module.exports = router
