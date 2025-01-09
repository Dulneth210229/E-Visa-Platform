const express = require("express");

//controller functions
const { signupUser, loginUser } = require("../Controllers/UserController");

const UserRoutes = express.Router();

//logic route
UserRoutes.post("/login", loginUser);

//Signup router
UserRoutes.post("/signup", signupUser);

module.exports = UserRoutes;
