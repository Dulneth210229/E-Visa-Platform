const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  passportCopy: { type: String, required: true },
  birthCertificate: { type: String, required: true },
  policeCertificate: { type: String, required: true },
  biodata: { type: String, required: true },
});

module.exports = mongoose.model("File", fileSchema);
