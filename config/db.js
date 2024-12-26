const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = async () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
      console.log("db connected");
      
    })
    .catch((err) => console.log(err));
};

dbConnect() 

module.exports.mongoose;
