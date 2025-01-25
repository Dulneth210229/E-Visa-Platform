const express = require("express");

const AdminVisaController = require("../Controllers/AdminVisaController");

const AdminVisaRoute = express.Router();

// Define routes with file upload
AdminVisaRoute.get("/", AdminVisaController.getVisa);
AdminVisaRoute.post("/", AdminVisaController.addVisa);
AdminVisaRoute.get("/:id", AdminVisaController.getVisaById);
AdminVisaRoute.put("/:id", AdminVisaController.updateVisa);
AdminVisaRoute.delete("/:id", AdminVisaController.deleteVisa);

module.exports = AdminVisaRoute;
