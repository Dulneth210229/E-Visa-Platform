const express = require("express");
const multer = require("multer");
const {
  uploadFiles,
  getFiles,
  downloadFile,
  deleteFile,
} = require("../Controllers/fileController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.fields([
    { name: "passportCopy", maxCount: 1 },
    { name: "birthCertificate", maxCount: 1 },
    { name: "policeCertificate", maxCount: 1 },
    { name: "biodata", maxCount: 1 },
  ]),
  uploadFiles
);

router.get("/", getFiles);
router.get("/download/:id/:field", downloadFile);
router.delete("/:id", deleteFile);

module.exports = router;
