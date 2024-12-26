const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VisaSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  visaType: {
    type: String,
    required: true,
  },
  visaDuration: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  passportCopy: {
    type: Buffer,
    required: true,
  },
  birthCertificate: {
    type: Buffer,
    required: true,
  },
  policeCertificate: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("visa", VisaSchema);
