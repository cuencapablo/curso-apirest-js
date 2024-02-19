const { createError, createThrowError } = require('../helpers/error')
const User = require('../models/user.model')
const auth = require('./auth')

function verifyCredentials(email, password) {
  if (
    !email ||
    email.trim().length === 0 ||
    !email.includes('@') ||
    !password ||
    password.trim().length === 0
  ) {
    createThrowError('Datos incorrectos', 422)
  }
}

const checkUserExistence = async (email) => {
  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (error) {
    createThrowError('Usuario no encontrado', 500)
  }

  if (existingUser) {
    createThrowError('Usuario ya existe', 422)
  }
}

const createUser = async (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  try {
    verifyCredentials(email, password)
  } catch (error) {
    return next(error)
  }
  try {
    await checkUserExistence(email)
  } catch (error) {
    return next(error)
  }

  const newUser = new User({
    name: name,
    email: email,
    password: password
  })

  try {
    const userToSave = await newUser.save()
    res.status(201).json({ message: 'Usuario Creado', user: userToSave })
  } catch (error) {
    const err = new createError('No se pudo crear el usuario', 500)
    return next(err)
  }
}

const verifyUsuario = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  try {
    verifyCredentials(email, password)
  } catch (error) {
    return next(error)
  }
  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (error) {
    const err = createError('Ha fallado en verificar el usuario', 500)
    return next(err)
  }

  if (existingUser.password !== password) {
    const err = createError('Email o password incorrectos', 422)
    return next(err)
  }
  let token

  try {
    token = auth.createToken(existingUser.id)
  } catch (error) {
    const err = createError(
      'Algo ha salido mal durante la creación de token',
      500
    )
    return next(err)
  }
  res
    .status(200)
    .json({ message: 'Usuario logeado', token: token, userId: existingUser.id })
}

const deleteUser = async (req, res, next) => {
  const userId = req.userId
  let user
  try {
    user = await User.findOne({ _id: userId })
  } catch (error) {
    const err = createError('Algo ocurrió al buscar el usuario', 500)
    return next(err)
  }

  try {
    await User.deleteOne({ _id: userId })
  } catch (error) {
    const err = createError('Algo ha salido mal', 500)
    return next(err)
  }
  res.status(200).json({ message: 'Usuario Eliminado' })
}

exports.createUser = createUser
exports.verifyUsuario = verifyUsuario
exports.deleteUser = deleteUser
