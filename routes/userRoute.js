const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "Ashu_Gupta"

const router = express.Router();

// Register Route
router.post("/signup", async (req, res) => {
  const {email, password } = req.body;

  // Input Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        user,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
        user,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

module.exports = router;
