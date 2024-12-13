const mongoose = require("mongoose")

const dbURI = 'mongodb://localhost:27017/new';


const dbConnect = async () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
      console.log("db connected");
      
    })
    .catch((err) => console.log(err));
};

dbConnect() 

// exports.default = mongoose
module.exports.mongoose;
