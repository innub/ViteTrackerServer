const express = require("express");
const router = express.Router();
const ScanPage = require("../pup/amazon");
const userSchema = require("../models/UserDataSchema");

router.post("/add", async (req, res) => {
  const reqUrl = req.body.url;
  const userId = req.body._id;
  console.log(userId);
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
  // await userSchema.findOne({ _id: userId }, (err, doc) => {
  //   console.log(doc);
  // });
  if (data != undefined) {
    const doc = await userSchema.updateOne(
      { _id: userId },
      { $push: { amazon: data } }
    );
    if (doc.nModified == 1) {
      res.send("add-success");
    }
  }
});

module.exports = router;
