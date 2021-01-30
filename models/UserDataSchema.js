const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user: {
    type: Object,
    required: true,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  amazon: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
