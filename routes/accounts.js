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
  try {
    await userSchema.findOne({ "user.email": email }, async (err, doc) => {
      if (doc === null) {
        const acc = await new userSchema(user).save();
        res.json({ status: "valid", _id: acc._id });
      } else if (doc.user.email === email) {
        res.json({
          status: "dupe",
          _id: "",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    await userSchema.findOne({ "user.email": email }, (err, user) => {
      if (user === null) {
        res.json({
          status: "email-invalid",
          _id: "",
        });
      } else if (user.user.password === password) {
        res.json({
          status: "valid",
          _id: user._id,
        });
      } else
        res.json({
          status: "pass-invalid",
          _id: "",
        });
    });
  } catch {
    res.status(404);
  }
});

router.delete("/delete", async (req, res) => {
  const password = req.body.password;
  const userId = req.body._id;
  console.log(userId);
  try {
    await userSchema.findOne({ _id: userId }, async (err, user) => {
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
