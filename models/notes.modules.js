const mongoose = require("mongoose");

const ToDo = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    // ! MIGHT BE AN ERROR HERE
  },
});

module.exports = mongoose.model("todo", ToDo);
