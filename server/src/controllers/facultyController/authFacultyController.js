const jwt = require("jsonwebtoken");
const Faculty = require("./../../models/Faculty");
const catchAsync = require("./../../middleware/catchAsync");
const AppError = require("./../../middleware/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

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
    
    const token =  signToken(newFaculty._id )
    res.status(201).json({
      status: "success",
      token,
      data: {
        faculty: newFaculty
      }
    });
  });
  
//Faculty Login
exports.loginFaculty = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const faculty = await Faculty.findOne({ email }).select("+password");

  if (
    !faculty ||
    !(await faculty.correctPassword(password, faculty.password))
  ) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(faculty._id);
  res.status(200).json({
    status: "success",
    token
  });
});
