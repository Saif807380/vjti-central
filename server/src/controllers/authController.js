const jwt = require("jsonwebtoken");
const Student = require("./../models/Student");
const Faculty = require("./../models/Faculty");
const catchAsync = require("../middleware/catchAsync");
const AppError = require("../middleware/appError");

//Register Student
exports.registerStudent = catchAsync(async (req, res, next) => {
  const newStudent = await Student.create({
    studentID: req.body.studentID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    admissionYear: req.body.admissionYear,
    department: req.body.department
  });

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
  const newFaculty = await Faculty.create({
    facultyID: req.body.facultyID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    department: req.body.department
  });
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
