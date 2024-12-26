const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
  userId: {
    type: String,
  },
  listname:{
    type:String,
  },
  dueDate: {
    type: Date,
  },
  startDate:{
    type: Date,
  },
});

module.exports = mongoose.model("Task", taskSchema);
