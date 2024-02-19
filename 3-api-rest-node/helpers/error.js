const createError = (message, code) => {
  const error = new Error(message)
  error.code = code
  return error
}

const createThrowError = (message, code) => {
  const error = createError(message, code)
  throw error
}

module.exports = { createError, createThrowError }
