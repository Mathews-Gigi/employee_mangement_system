const mongooes = require("mongoose");

// login Schema

const userSchema = new mongooes.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      match: [
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        "Enter a valid Phone number",
      ],
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter a valid Email",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "employee", "hr", "manager"],
      require: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongooes.model.register || mongooes.model("register", userSchema);

module.exports = Users;
