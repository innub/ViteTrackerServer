const mongoose = require("mongoose");
const userSchema = require("./models/UserDataSchema");
const ScanPage = require("./pup/amazon");

const dataMatch = async () => {
  const data = await userSchema.find({});
  console.log(data);
};

module.exports = dataMatch;
