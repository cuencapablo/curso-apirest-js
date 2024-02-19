const TareaModel = require('../models/tarea-model')

// Midlewares por tener las parámetros req, res, next
const getTareas = (req, res) => {
  const tareas = TareaModel.getTareas()
  // res.send(tareas)
  res.status(200).json({ tareas: tareas.map((task) => task) })
}

exports.getTareas = getTareas
