const { register } = require("../controller/register");
const { login, verifyUser } = require("../controller/authController");
const { authenticateUser } = require("../middleware/authMiddleware.js");
const { addDepartment } = require("../controller/departmentController.js");
const express = require("express");

// Initialize router
const router = express.Router();

// Define routes
router.post("/register", register);
router.post("/login", login);
router.get("/verify", authenticateUser, verifyUser);
router.post("/departments", authenticateUser, addDepartment);

module.exports = router;
