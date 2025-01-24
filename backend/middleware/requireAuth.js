const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  // Extract token from the authorization header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Find the user and attach to the request object
    const user = await User.findOne({ _id }).select("_id");
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;
