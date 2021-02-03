const express = require("express");
const router = express.Router();
const ScanPage = require("../pup/amazon");
const userSchema = require("../models/UserDataSchema");

router.post("/list", async (req, res) => {
  const userId = req.body._id;
  let data;
  await userSchema.find({ _id: userId }, (err, doc) => {
    data = doc[0].amazon;
  });
  res.json({ amazon: data });
});

router.post("/add", async (req, res) => {
  const reqUrl = req.body.url;
  const userId = req.body._id;

  let match = false;
  await userSchema.findOne({ _id: userId }, (err, doc) => {
    var amazonList = doc.amazon;
    amazonList.forEach((el) => {
      if (el.url === reqUrl) {
        match = true;
      }
    });
  });
  if (match) {
    res.send("dupe");
    return;
  }
  if (!match) {
    const data = await ScanPage(reqUrl)
      .then((data) => {
        if (data != undefined) {
          return data[0];
        } else {
          res.send("url-invalid");
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (data != undefined && !match) {
      const doc = await userSchema.updateOne(
        { _id: userId },
        { $push: { amazon: data } }
      );
      if (doc.nModified == 1) {
        res.send("add-success");
      }
    }
  }
});

module.exports = router;
