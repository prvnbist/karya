const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema(
   {
      title: String,
      todos: [
         {
            type: Schema.Types.ObjectId,
            ref: 'todos',
         },
      ],
   },
   {
      timestamps: true,
   }
)
const Label = mongoose.model('Label', schema)

module.exports = Label