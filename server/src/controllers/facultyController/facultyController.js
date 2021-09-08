const Faculty = require("./../../models/Faculty");
const catchAsync = require("./../../middleware/catchAsync");

exports.getAllFaculties = catchAsync(async (req, res, next) => {
  const faculties = await Faculty.find().select(["_id", "name"]);

  res.status(200).json({
    status: "success",
    results: faculties.length,
    data: {
      faculties
    }
  });
});

exports.getFaculty = catchAsync(async (req, res, next) => {
  const faculty = await Faculty.findOne({
    facultyID: req.params.facultyID
  }).select(["facultyID", "name", "email", "department", "position"]);

  res.status(200).json({
    status: "success",
    data: {
      faculty
    }
  });
});

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
