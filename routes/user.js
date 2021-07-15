const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home page loaded");
});
module.exports = router;
