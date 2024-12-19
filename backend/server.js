require("dotenv").config();

const express = require("express");

//express app
const app = express();

//route handlers
app.get("/", (req, res) => {
  res.jason({ message: "Welcome to the app" });
});

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on  port", process.env.PORT);
});
