const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  { title: String },
  {
    timestamps: true
  }
);
const Todo = mongoose.model("Todo", schema);

module.exports = Todo;
