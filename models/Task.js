const mongoose = require("mongoose")


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Please enter an title"],
  },
  status: {
    type: String,
    default: "to do",
  },
  priority: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  assignedUser: {
    type: String,
    // required: true
  },
  dueDate: {
    type: Date,
    // required: true
  }
})

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;


