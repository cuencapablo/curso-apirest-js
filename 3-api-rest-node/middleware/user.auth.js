require('dotenv').config()
const jwt = require('jsonwebtoken')
const { createError, createThrowError } = require('../helpers/error')

//Bearer
const retrieveToken = (headers) => {
  if (!headers.authorization || headers.authorization === '') {
    createThrowError('Autorización denegada', 401)
  }

  const token = headers.authorization.split(' ')[1]

  if (!token || token == '') {
    createThrowError('Autorización denegada', 401)
  }

  return token
}

const verifyUser = (req, res, next) => {
  let token

  try {
    token = retrieveToken(req.headers)
  } catch (error) {
    return next(error)
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    const err = createError('Token inválido', 401)
    return next(err)
  }

  req.userId = decoded.uid

  next()
}

module.exports = verifyUser
