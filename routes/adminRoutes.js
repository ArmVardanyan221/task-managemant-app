const {Router} = require('express');
const User = require("../models/User"); // Your User model
const router = Router();
const {isAdmin, checkUser, getAllUsers} = require("../middlewares/authMiddleware");
const { createUser, getUsers, deleteUser } = require('../controllers/authController');

router.get('/admin/users', checkUser, isAdmin, getAllUsers, getUsers);


router.post('/users/add', createUser)


router.delete('/users/:id', checkUser, isAdmin, deleteUser);




module.exports = router;
