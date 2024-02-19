const userController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()

router.post('/signup', userController.createUser)
router.post('/login', userController.verifyUsuario)
router.delete('/user/delete/:id', userController.deleteUser)

module.exports = router
