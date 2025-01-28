const File = require("../Model/FileModel");
const path = require("path");
const fs = require("fs");

exports.uploadFiles = async (req, res) => {
  try {
    const { name } = req.body; // Extract name from request body
    const { passportCopy, birthCertificate, policeCertificate, biodata } =
      req.files;
    const newFile = new File({
      name,
      passportCopy: passportCopy[0].path,
      birthCertificate: birthCertificate[0].path,
      policeCertificate: policeCertificate[0].path,
      biodata: biodata[0].path,
    });
    await newFile.save();
    res.status(201).json({ message: "Files uploaded successfully!", newFile });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files", error });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const { id, field } = req.params;
    const file = await File.findById(id);
    const filePath = file[field];
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Failed to download file", error });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    Object.values(file.toObject()).forEach((filePath) => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
    await File.findByIdAndDelete(id);
    res.status(200).json({ message: "Files deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete files", error });
  }
};
