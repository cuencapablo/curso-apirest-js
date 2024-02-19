const mongoose = require('mongoose')
const Task = require('../models/task.model')
const { createError } = require('../helpers/error')

const createTask = async (req, res, next) => {
  const title = req.body.title
  const text = req.body.text
  const user = req.userId

  let taskCreated
  const newTask = new Task({
    title: title,
    text: text,
    user: new mongoose.Types.ObjectId(user)
  })

  try {
    taskCreated = await newTask.save()
  } catch (error) {
    const err = createError('No ha podido crear tarea', 500)
    return next(err)
  }

  res.status(201).json({ message: 'Tarea creada', task: taskCreated })
}

const readTask = async (req, res, next) => {
  const user = req.userId

  let tasks

  try {
    tasks = await Task.find({ user: user })
  } catch (error) {
    const err = createError(
      'Algo ha ocurrido al momento de obtener tareas',
      500
    )
    return next(err)
  }

  res.status(200).json({ tasks: tasks })
}

const updateTask = async (req, res, next) => {
  const task_id = req.params.id
  const user = req.userId
  let task

  try {
    task = await Task.findOne({ _id: task_id })
  } catch (error) {
    const err = createError('No ha encontrado tarea', 500)
    return next(err)
  }

  if (task.user.toString() !== user) {
    const err = createError(
      'Usuario no autorizado para actualizar la tarea',
      403
    )
    return next(err)
  }

  const filter = { _id: task_id }

  let taskUpdated
  try {
    taskUpdated = await Task.findByIdAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    })
  } catch (error) {
    const err = createError('No se ha podido modificar la tarea', 500)
    return next(err)
  }

  res.status(200).json({ message: 'Tarea modificada', task: taskUpdated })
}

const deleteTask = async (req, res, next) => {
  const taskId = req.params.id
  const user_id = req.userId
  let task
  try {
    task = await Task.findOne({ _id: taskId })
  } catch (error) {
    const err = createError('Algo ha ocurrido al buscar la tarea', 500)
    return next(err)
  }

  if (task.user.toString() !== user_id) {
    const err = createError('Usuario no autorizado para esta acción', 403)
    return next(err)
  }
  try {
    await Task.deleteOne({ _id: taskId })
  } catch (error) {
    const err = createError('Algo ha salido mal', 500)
    return next(err)
  }

  res.status(200).json({ message: 'Elemento eliminado' })
}

exports.createTask = createTask
exports.readTask = readTask
exports.updateTask = updateTask
exports.deleteTask = deleteTask
