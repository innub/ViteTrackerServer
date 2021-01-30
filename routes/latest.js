const express = require("express");
const router = express.Router();
const Latest = require("../pup/latest");

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const data = await Latest(limit);
  res.json(data);
});

module.exports = router;
