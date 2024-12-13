const jwt = require("jsonwebtoken")
const User = require("../models/User")

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  //check json web token exists & is verified

  if (token) {
    jwt.verify(token, "secret key", (err, decodedToken) => {
      if (err) {
        // console.log("Console.log from requireAuth: ", err.message);
        res.redirect("/login")
      } else {
        // console.log("DecodedToken: from requireAuth ", decodedToken);
        next();
      }
    })
  }
  else {
    res.redirect("/login")
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "secret key", async (err, decodedToken) => {
      if (err) {
        // console.log("console.log from checkUser: ", err.message);
        res.locals.user = null;
        // console.log("console.log from checkUser ", res.locals.user);
        next()
      } else {
        // console.log("console.log from checkUser: Decoded token: ", decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;  
        // console.log("CheckUser: ", res.locals);
        next();
      }
    }) 
  }
  else {
    res.locals.user = null
    next()
  }
}

const getNormallyDate = (task) => {
  task.dueDateFormatted = new Date(task.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}


module.exports = { requireAuth, checkUser, getNormallyDate }
