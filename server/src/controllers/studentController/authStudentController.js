const jwt = require("jsonwebtoken");
const Student = require("./../../models/Student");
const catchAsync = require("./../../middleware/catchAsync");
const AppError = require("./../../middleware/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

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

  const token = signToken(newStudent._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      student: newStudent
    }
  });
});

//Student Login
exports.loginStudent = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Please provide email and password!", 400));
  }

  const student = await Student.findOne({ email }).select("+password");

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(student._id);
  res.status(200).json({
    status: "success",
    token
  });
});
