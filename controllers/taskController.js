const Task = require("../models/Task");
const { getNormallyDate } = require("../middlewares/authMiddleware")



module.exports.createTask_get = (req, res) => {
  res.render("createtask");
}


module.exports.createTask_post = async (req, res) => {
  const { title, status, priority, description, assignedUser, dueDate } = req.body;
  const newTask = { title, status, priority, description, assignedUser, dueDate };
  try {
    const task = await new Task(newTask);
    const savedTask = await task.save();

    res.status(201).json({
      message: "created sucssesfully",
      data: savedTask,
    });

  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
}


module.exports.dashboard_get = async (req, res) => {
  try {
    const tasks = await Task.find();

    tasks.forEach(task => {
      getNormallyDate(task)
    });
    // Render tasks list template
    res.render('dashboard', { tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Error retrieving tasks');
  }
}
