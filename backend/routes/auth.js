const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");


// --- Email/Password Signup ---
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  try {
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Signup successful", token, name: newUser.name, email: newUser.email, role: newUser.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// --- Email/Password Login ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token, name: user.name, email: user.email, role: user.role });
});

// --- Google Login ---
router.post("/google-login", async (req, res) => {
  const { credential } = req.body;

  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    const { email, name } = response.data;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email, name, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token, name, email, role: user.role });
  } catch (err) {
    res.status(400).json({ message: "Invalid Google token" });
  }
});

// ✅ Get user role from token
router.get("/get-role", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "SECRET_KEY", async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const user = await User.findById(decoded.id).select("role name");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ role: user.role, name: user.name });
  });
});






module.exports = router;
