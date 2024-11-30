const User = require("../models/users.js");
const jwt = require("jsonwebtoken");

// verify the user

const authenticateUser = async (req, res, next) => {
  const authorization = req.headers.authorization;

  // Checking  authorization header exists and starts with 'Bearer'
  const token = authorization?.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Missing or invalid authorization header",
    });
  }
  console.log("token", token);

  try {
    // if (!process.env.JWT_SECRET_KEY) {
    //   throw new Error(
    //     "JWT_SECRET_KEY is not defined. Please set it in your environment variables."
    //   );
    // }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decode", decoded);

    if (!decoded) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("user", user);

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    console.error("JWT verification error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid token provided" });
  }
};

module.exports = { authenticateUser };
