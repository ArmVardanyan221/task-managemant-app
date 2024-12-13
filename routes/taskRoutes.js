const Router = require("express")
const taskController = require("../controllers/taskController");

const router = Router();


router.get("/createtask",  taskController.createTask_get);
router.post("/createtask",  taskController.createTask_post);

router.get('/dashboard',  taskController.dashboard_get);
// routes

module.exports = router;
