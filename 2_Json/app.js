const express = require('express')
const app = express()
const rutas = require('./routes/tarea-route')

app.use(rutas)

app.listen(8000)

/* 

GET http://localhost:8000/api/tareas

*/
