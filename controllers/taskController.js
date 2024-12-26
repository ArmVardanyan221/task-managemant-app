const Task = require("../models/Task");
const { getNormallyDate } = require("../middlewares/authMiddleware")
const { Constants } = require('../costants/costants');

module.exports.createTask_get = (req, res) => {
  const TaskPriority = Constants.TaskPriority
  res.render("createtask", TaskPriority);
}

module.exports.createTask_post = async (req, res) => {
  const { title, priority, description, assignedUser, dueDate } = req.body;
  const newTask = { title, priority, description, assignedUser, dueDate };
  try {
    const task = await new Task(newTask);
    const savedTask = await task.save();
    // console.log(savedTask);

    res.status(201).json({
      message: "created sucssesfully",
      data: savedTask,
      users: req.users
    });


  } catch (error) {

    res.status(400).json({ error: error.message });
  }
}

module.exports.dashboard_get = async (req, res) => {
  try {
    const tasks = await Task.find();

    tasks.forEach(task => {
      getNormallyDate(task)
    });

    res.render('dashboard', { tasks });
    // Render tasks list template
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Error retrieving tasks');
  }
}

module.exports.edittask_get = async (req, res) => {
  const taskId = req.params.id;  
  try {
    const task = await Task.findOne({ _id: taskId})
    // console.log(task);
    res.locals.task = task
    
    res.render("edittask");
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}

module.exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body; 


    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {
      new: true,  // Returns the updated task
      runValidators: true,  // Run schema validation
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }


    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
