const Faculty = require("./../../models/Faculty");
const catchAsync = require("./../../middleware/catchAsync");

exports.getAllFaculties = (req, res) => {
  const faculties = await Faculty.find();

  res.status(200).json({
    status: "success",
    results: faculties.length,
    data: {
      faculties
    }
  });
};

exports.getFaculty = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};

exports.createFaculty = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};

exports.updateFaculty = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};

exports.deleteFaculty = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};
