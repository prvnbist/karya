const mongoose = require('mongoose')

const schema = new mongoose.Schema(
   {
      title: String,
      labels: { type: Array, default: [] },
      status: {
         type: String,
         enum: ['TODO', 'IN_PROGRESS', 'DONE'],
         default: 'TODO',
      },
   },
   {
      timestamps: true,
   }
)
const Todo = mongoose.model('Todo', schema)

module.exports = Todo
