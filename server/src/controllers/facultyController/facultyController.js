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
  let faculty = await Faculty.findById(req.params.facultyID);
  if (!faculty) return res.status(404).json({ error: "Invalid Faculty ID" });

  return res.status(200).json({
    name: faculty.name,
    facultyID: faculty.facultyID,
    email: faculty.email,
    department: faculty.department,
    description: faculty.description,
    position:faculty.position
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
