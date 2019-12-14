const mongoose = require('mongoose')

const schema = new mongoose.Schema(
   { title: String, tags: { type: Array, default: [] } },
   {
      timestamps: true,
   }
)
const Todo = mongoose.model('Todo', schema)

module.exports = Todo
