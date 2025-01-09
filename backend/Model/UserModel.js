const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Scheme = mongoose.Schema;

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
  const exists = await this.findOne({ email });
  if (exists) {
    throw error("Email already inuse");
  }

  //generate the salt
  const salt = await bcrypt.genSalt(10);
  //hash the password for extra security
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

module.exports = mongoose.model("User", UserScheme);
