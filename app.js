const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require("./config/db")
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { requireAuth } = require("./middlewares/authMiddleware")
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');



// routes
app.use(authRoutes);
app.use(requireAuth, taskRoutes);



// app.get("/set-cookie", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");

//   res.cookie("newUser", false);
//   res.cookie("isEmployee", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     // secure: true,
//     httpOnly: true
//   });
//   res.send("cookie ready")
// })
// app.get("/get-cookie", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);

//   res.json(cookies)
// })

app.listen(3000, () => {
  console.log("server running http://localhost:3000");

})

