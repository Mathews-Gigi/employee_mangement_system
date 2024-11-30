const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "data missing" });
  }
  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ status: false, message: "User not exist" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid creditials" });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    });

    res.status(200).json({
      success: true,
      message: "success",
      user: {
        id: userExist._id,
        userName: userExist.userName,
        role: userExist.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ Error: "Internal Server error" });
  }
};

const verifyUser = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
module.exports = { login, verifyUser };
