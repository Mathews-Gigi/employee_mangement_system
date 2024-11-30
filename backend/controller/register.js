const User = require("../models/users.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { userName, password, email, phoneNumber } = req.body;
  try {
    const userExist = await User.findOne({ email });
    // user alredy exist check
    if (userExist) {
      return res.status(400).json({ error: "User already exist" });
    }
    //hasing the password
    const hashPassword = await bcrypt.hash(password, 10);
    //instance of a new user
    const newUser = new User({
      userName,
      password: hashPassword,
      phoneNumber: phoneNumber,
      email,
    });
    //save new user
    await newUser.save();

    res.status(201).json({ message: "Sign up Succesfull" });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ Error: "Internal Server error" });
  }
};

module.exports = { register };
//UTKNH4xdHjyclkoa
