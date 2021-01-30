const express = require("express");
const router = express.Router();
const userSchema = require("../models/UserDataSchema");

router.post("/create", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = {
    user: {
      email: email,
      password: password,
    },
    amazon: [],
  };
  await new userSchema(user).save();
  res.send("response");
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await userSchema.findOne({ "user.email": email }, (err, user) => {
      if (user === null) {
        res.send("email-invalid");
      } else if (user.user.password === password) {
        res.send("valid");
      } else res.send("pass-invalid");
    });
  } catch {
    res.status(404);
  }
});

router.delete("/delete", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await userSchema.findOne({ "user.email": email }, async (err, user) => {
      if (user.user.password === password) {
        await userSchema.deleteOne({ _id: user._id });
        res.send("valid");
      } else {
        res.send("pass-invalid");
      }
    });
  } catch {
    res.status(404);
  }
});
module.exports = router;
