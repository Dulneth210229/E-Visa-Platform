require("dotenv").config(); // Import and configure dotenv
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

//getting start insert the routes
const visaRouter = require("./Routes/VisaRoutes");
const UserRouter = require("./Routes/UserRoutes");

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (uploaded images, PDFs, etc.)
app.use("./uploads", express.static(path.join(__dirname, "uploads")));

//Route handling
app.use("/api/visa", visaRouter);
app.use("/api/user", UserRouter);

// MongoDB Connection using .env file
const mongoURI = process.env.MONGO_URI; // Fetch the MongoDB URI from .env

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Start the server
const PORT = process.env.PORT || 5000; // Fetch the port from .env or use 5000 as default
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
