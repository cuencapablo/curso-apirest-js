const express = require('express')
const app = express()

// function Callback
app.get('/', function (req, res) {
  const a = '<h1>Hola mundo<h1>'
  res.send(a)
})

app.listen(3000)

/*

GET http://localhost:3000/

*/
