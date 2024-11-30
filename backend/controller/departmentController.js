const Department = require("../models/department.js");

const addDepartment = async (req, res) => {
  const { departmentName, description } = req.body;

  // Validate input
  if (!departmentName || !description) {
    return res.status(400).json({
      success: false,
      message: "Both departmentName and description are required.",
    });
  }

  try {
    // Check if the department already exists
    const deptExist = await Department.findOne({ departmentName });
    if (deptExist) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

    // Create and save new department
    const newDepartment = new Department({
      departmentName,
      description,
    });
    await newDepartment.save();

    return res.status(201).json({
      success: true,
      message: "New department created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error occurred.",
    });
  }
};

const getAllDepaetment = async (req, res) => {
  const { page, pageLimit, search, sort, filter } = req.query;
  if (!page || !pageLimit) {
    return res
      .status(400)
      .json({ success: false, message: "page and pageLimit are required" });
  }
  const pageNumber = parseInt(page, 10);
  const pageLimitNumber = parseInt(pageLimit, 10);

  const limit = pageLimitNumber;
  const offset = (pageNumber - 1) * limit;
  try {
    const data = await Department.find();
    if (!data) {
      return res.status(404).json({ success: false, message: "no data found" });
    }
    return res.status(200).json({
      success: true,
      message: "fetch successfull ",
      data: data.rows,
      totalItems: data.count,
      currentPage: data.pageNumber,
      totalPage: Math.ceil(data.count / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error occurred.",
    });
  }
};

module.exports = { addDepartment };
