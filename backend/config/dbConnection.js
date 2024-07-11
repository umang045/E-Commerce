const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URL);
    console.log("databse connected sucessfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
