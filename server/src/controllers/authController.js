const jwt = require("jsonwebtoken");
const Student = require("./../models/Student");
const Faculty = require("./../models/Faculty");
const catchAsync = require("../middleware/catchAsync");
const AppError = require("../middleware/appError");

//Register Student
exports.registerStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findOne({
    $or: [{ studentID: req.body.studentID }, { email: req.body.email }]
  });

  if (student) {
    return res.status(400).json({
      error: "Student with this ID or email already exists"
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      error: "Password and Confirm Password do not match"
    });
  }

  const newStudent = await Student.create(req.body);

  const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      student: newStudent
    }
  });
});

//Register Faculty
exports.registerFaculty = catchAsync(async (req, res, next) => {
  const faculty = await Faculty.findOne({
    $or: [{ facultyID: req.body.facultyID }, { email: req.body.email }]
  });

  if (faculty) {
    return res.status(400).json({
      error: "Faculty with this ID or email already exists"
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      error: "Password and Confirm Password do not match"
    });
  }

  const newFaculty = await Faculty.create(req.body);
  const token = jwt.sign({ id: newFaculty._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  res.status(201).json({
    status: "success",
    token,
    data: {
      faculty: newFaculty
    }
  });
});

//Student Login
exports.loginStudent = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide email and password!", 400));
  }

  const token = "";
  res.status(200).json({
    status: "success",
    token
  });
};

//Faculty Login
exports.loginFaculty = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const token = "";
  res.status(200).json({
    status: "success",
    token
  });
};
