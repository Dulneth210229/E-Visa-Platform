const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Scheme = mongoose.Schema;
const validator = require("validator");

const UserScheme = new Scheme({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static method to signup user
UserScheme.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be strong");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already inuse");
  }

  //generate the salt
  const salt = await bcrypt.genSalt(10);
  //hash the password for extra security
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//static login method
UserScheme.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", UserScheme);
