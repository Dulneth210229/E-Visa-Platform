const User = require("../Model/UserModel");

// login user

const loginUser = async (req, res) => {
  res.json({ message: "Login user" });
};

//Signup user
const signupUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  res.json({ message: "Signup user" });
};

module.exports = { signupUser, loginUser };
