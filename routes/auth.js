const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// register new user
router.post("/register", async (req, res) => {
  try {
    hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    await newUser.save();
    res.sendStatus(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// login the user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.sendStatus(404).send("unfound");
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("wrong password");

    res.sendStatus(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
