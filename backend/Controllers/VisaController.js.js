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
};
