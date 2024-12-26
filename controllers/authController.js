const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = {
    email: '',
    password: '',
  }

  if (err.message === "incorrect email") {
    errors.email = 'that email is not registed';
    return errors;
  }

  if (err.message === "incorrect password") {
    errors.password = 'that password is incorrect';
    return errors;
  }

  if (err.code == 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.signup_get = (req, res) => {
  res.render("signup");
}

module.exports.login_get = (req, res) => {
  res.render("login");
}

module.exports.signup_post = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const role = user.role;
    const token = createToken(user._id, role);

    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user });

  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const role = user.role;
    const token = createToken(user._id, role);

    res.cookie(
      "token",
      token,
      { httpOnly: true, maxAge: maxAge * 1000 }
    );

    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors })
  }
}


module.exports.logout_get = (req, res) => {
  res.cookie("token", '', { maxAge: 1 });
  res.redirect("/");
}

//Admin Pages
module.exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = req.users;

    res.render('admin-users', { users });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
}

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      // Find and delete the user
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}

