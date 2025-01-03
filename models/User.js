const mongoose = require("mongoose");
const { isEmail } = require("validator")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, " Please enter a valid email"]

  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 caracters"],
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'User'],
    default: 'User'
  }
})

// userSchema.post('save', function (doc, next) {
//   console.log('new user after created & saved', doc);

//   next();
// })

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  // console.log('user about to be created & saved', this);
  next();
})

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
}

const User = mongoose.model("user", userSchema);

module.exports = User;
