const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

const statusFlow = {
  'to do': ['in progress', 'done'],  
  'in progress': ['done'],          
  'done': [] 
};


router.post('/updateTaskStatus', async (req, res) => {
  const { taskId, status, user } = req.body;
  
  if (!['to do', 'in progress', 'done'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (user === 'User') {
      const currentStatus = task.status;
    
      if (statusFlow[currentStatus].indexOf(status) === -1) {
        return res.status(400).json({ error: 'You cannot move a task back to a previous status' });
      }
    }


    task.status = status;
    await task.save();
    
    res.status(200).json({ message: 'Task status updated successfully', task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

module.exports = router;




