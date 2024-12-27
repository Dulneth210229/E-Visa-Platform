const express = require("express");
const visaRouter = express.Router();

//Insert the model
const Visa = require("../Model/VisaModel");
//Insert the controller
const VisaController = require("../Controllers/VisaController");

//create the route paths
visaRouter.get("/", VisaController.getVisa);
visaRouter.post("/", VisaController.addVisa);
visaRouter.get("/:id", VisaController.getVisaById);
visaRouter.put("/:id", VisaController.updateVisa);
visaRouter.delete("/:id", VisaController.deleteVisa);

//export the router
module.exports = visaRouter;
