
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDB = async (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectDB;
