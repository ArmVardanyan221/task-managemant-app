const Router = require("express")
const taskController = require("../controllers/taskController");
const { checkUser, getAllUsers } = require("../middlewares/authMiddleware");
const router = Router();



router.get("/createtask", getAllUsers,  taskController.createTask_get);
router.post("/createtask", taskController.createTask_post);

router.get('/dashboard', checkUser, taskController.dashboard_get);

router.get("/tasks/:id", getAllUsers,  taskController.edittask_get)

// router.put("/tasks/:id", taskController.edittask_put);
router.post("/tasks/:id", taskController.updateTask)


router.delete('/tasks/:id', taskController.deleteTask);
// routes



module.exports = router;
