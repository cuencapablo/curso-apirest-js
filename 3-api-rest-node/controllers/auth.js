require('dotenv').config()
const jwt = require('jsonwebtoken')

const createToken = (userId) => {
  const token = jwt.sign({ uid: userId }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  })
  return token
}

exports.createToken = createToken
