const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  Title: {
    type: String,
    require: [true, "Name is Required"],
    trim: true,
  },
  Task: [{
    type: String,
  }],
},
{
  timestamps:{ currentTime: ()=> Date.now().toString() },}
);

module.exports = mongoose.model("Todo", todoSchema);
