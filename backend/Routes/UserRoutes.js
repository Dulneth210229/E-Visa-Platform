const express = require("express");

// Controller functions
const {
  signupUser,
  loginUser,
  deleteUser,
  getUserById,
} = require("../Controllers/UserController");

const UserRoutes = express.Router();

// Login route
UserRoutes.post("/login", loginUser);

// Signup route
UserRoutes.post("/signup", signupUser);

// Get user by ID route
UserRoutes.get("/:id", getUserById);

// Delete user route
UserRoutes.delete("/:id", deleteUser);

module.exports = UserRoutes;
