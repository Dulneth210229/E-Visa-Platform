const Visa = require("../Model/VisaModel");

//creating a function to get details
//display all visas
const getVisa = async (req, res, next) => {
  let visa;
  //get Visa Details
  try {
    visa = await Visa.find();
  } catch (err) {
    console.log(err);
  }
  // If details not found
  if (!visa) {
    return res.status(404).json({ message: "Visa not found" });
  }
  // Display all visas
  return res.status(200).json({ visa });
};

//insert visa details
const addVisa = async (req, res, next) => {
  //get visa details
  const {
    firstName,
    lastName,
    DOB,
    email,
    phoneNumber,
    country,
    address,
    postalCode,
    visaType,
    visaDuration,
    purpose,
    passportCopy,
    birthCertificate,
    policeCertificate,
  } = req.body;

  let visa;
  try {
    visa = new Visa({
      firstName,
      lastName,
      DOB,
      email,
      phoneNumber,
      country,
      address,
      postalCode,
      visaType,
      visaDuration,
      purpose,
      passportCopy,
      birthCertificate,
      policeCertificate,
    });
    await visa.save();
  } catch (err) {
    console.log(err);
  }

  if (!visa) {
    return res.status(404).json({ message: "Visa not found" });
  }
  // Display all visas
  return res.status(200).jason({ visa });
};

//Get visa by Id
const getVisaById = async (req, res, next) => {
  const visaId = req.params.id;
  let visa;
  try {
    visa = await Visa.findById(visaId);
  } catch (err) {
    console.log(err);
  }
  //not available visa
  if (!visa) {
    return res.status(404).json({ message: "Visa not found" });
  }
  //display visa by id
  return res.status(200).json({ visa });
};

//update visa details
const updateVisa = async (req, res, next) => {
  const visaId = req.params.id;
  const {
    firstName,
    lastName,
    DOB,
    email,
    phoneNumber,
    country,
    address,
    postalCode,
    visaType,
    visaDuration,
    purpose,
    passportCopy,
    birthCertificate,
    policeCertificate,
  } = req.body;

  let visa;
  try {
    visa = await Visa.findByIdAndUpdate(visaId, {
      firstName,
      lastName,
      DOB,
      email,
      phoneNumber,
      country,
      address,
      postalCode,
      visaType,
      visaDuration,
      purpose,
      passportCopy,
      birthCertificate,
      policeCertificate,
    });
    visa = await visa.save();
  } catch (err) {
    console.log(err);
  }
  //not available visa
  if (!visa) {
    return res.status(404).json({ message: "Unable to update visa" });
  }
  //display visa by id
  return res.status(200).json({ visa });
};

//Delete visa
const deleteVisa = async (req, res, next) => {
  const visaId = req.params.id;

  let visa;
  try {
    visa = await Visa.findByIdAndDelete(visaId);
  } catch (err) {
    console.log(err);
  }
  //not available visa
  if (!visa) {
    return res.status(404).json({ message: "Unable to delete visa" });
  }
  //display visa by id
  return res.status(200).json({ message: "Visa deleted successfully" });
};

//Export to routs
exports.getVisa = getVisa;
exports.addVisa = addVisa;
exports.getVisaById = getVisaById;
exports.updateVisa = updateVisa;
exports.deleteVisa = deleteVisa;
