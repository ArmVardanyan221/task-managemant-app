const Router = require("express")
const authController = require("../controllers/authController")
const { checkUser } = require("../middlewares/authMiddleware")
const Task = require("../models/Task");
const router = Router();

router.get("*", checkUser);
router.get('/', (req, res) => res.render('home'));



router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

// routes

module.exports = router;
