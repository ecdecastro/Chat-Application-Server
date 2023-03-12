const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, picture } = req.body;
    const user = await User.create({ name, email, password, picture });
    res.status(201).json(user);
  } catch (err) {
    let msg;
    if (err === 11000) {
      msg = "User Already Exists";
    } else {
      msg = err.message;
    }
    console.log(err);
    res.status(400).json(msg);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
