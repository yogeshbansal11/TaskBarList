import mongoose from "mongoose";

const task = mongoose.Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listName: {
    type: String,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lists",
    required: true,
  },
  userId: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  dueDate: {
    type: Date,
  },
  location: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
  },
  taskColor: {
    type: String,
  },

});

const taskSchema = mongoose.model("Task", task);

export default taskSchema