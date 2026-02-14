const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({
      name,
      email,
      password,
    });

    const user = await newUser.save();
    res.send({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email, password: password });
    if (user) {
      //The (temp) will only show in the browser side without involving the password
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else {
      res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
