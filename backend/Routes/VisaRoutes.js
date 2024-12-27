const express = require("express");
const multer = require("multer");
const path = require("path");
const VisaController = require("../Controllers/VisaController");

const visaRouter = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Define routes with file upload
visaRouter.get("/", VisaController.getVisa);
visaRouter.post(
  "/",
  upload.fields([
    { name: "passportCopy", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
    { name: "policeCertificate", maxCount: 1 },
  ]),
  VisaController.addVisa
);
visaRouter.get("/:id", VisaController.getVisaById);
visaRouter.put(
  "/:id",
  upload.fields([
    { name: "passportCopy", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
    { name: "policeCertificate", maxCount: 1 },
  ]),
  VisaController.updateVisa
);
visaRouter.delete("/:id", VisaController.deleteVisa);

module.exports = visaRouter;
