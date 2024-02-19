const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(' ✅MongoDB Conectado')
  } catch (error) {
    console.log(' ❌Error al Error: ', error)
    process.exit(1)
  }
}

module.exports = connectDB
