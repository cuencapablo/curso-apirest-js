const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },

  text: {
    required: true,
    type: String
  },
  user: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Task', TaskSchema)
