const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes")
const updateTaskStatus = require("./routes/updateTask")
const { requireAuth } = require("./middlewares/authMiddleware")
require("dotenv").config();
const port = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.use(authRoutes);
app.use(requireAuth, taskRoutes);
app.use(updateTaskStatus);
app.use(adminRoutes);
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);

})

