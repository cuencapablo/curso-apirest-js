const express = require('express')
require('dotenv').config()
const app = express()

const taskRoutes = require('./routes/task.route')
const userRoutes = require('./routes/user.route')
const verifyUser = require('./middleware/user.auth')

const connecDB = require('./lib/db')
const PORT = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connecDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` 🚀Servidor corriendo en: http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(' ❌Error al iniciar el servidor', err)
  })

app.use(userRoutes)
app.use(verifyUser, taskRoutes)
app.use((err, req, res, next) => {
  let code = 500
  let message = 'Algo ha ocurrido mal'
  if (err.code) {
    code = err.code
  }
  if (err.message) {
    message = err.message
  }
  res.status(code).json({ message: message, code: code })
})
