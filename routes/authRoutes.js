const Router = require("express")
const { signup_get, signup_post, login_get, logout_get, login_post } = require("../controllers/authController")
const { checkUser } = require("../middlewares/authMiddleware")
const Task = require("../models/Task");
const router = Router();

router.get("*", checkUser);
router.get('/', (req, res) => {
    return res.render('home')
});



router.get("/signup", signup_get);
router.get("/login", login_get);
router.get("/logout", logout_get);

router.post("/signup", signup_post);
router.post("/login", login_post);

// routes

module.exports = router;
