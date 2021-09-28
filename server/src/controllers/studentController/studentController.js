const Student = require("./../../models/Student");
const catchAsync = require("./../../middleware/catchAsync");
const axios = require("axios");

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.find();

  res.status(200).json({
    status: "success",
    results: students.length,
    data: {
      students
    }
  });
});

exports.getStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.studentID);
    if (!student) return res.status(404).json({ error: "Invalid Student ID" });

    const response = await axios.post(
      process.env.VJ_CHAIN_NODE_URL + "/checkBalance",
      {
        public_key: student.publicKey
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status !== 200)
      return res.status(500).json({
        error: "An error occurred while fetching wallet balance from VJ Chain"
      });

    return res.status(200).json({
      name: student.name,
      studentID: student.studentID,
      email: student.email,
      publicKey: student.publicKey,
      department: student.department,
      year: student.admissionYear,
      degree: student.degree,
      walletBalance: response.data
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.createStudent = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};

exports.updateStudent = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};

exports.deleteStudent = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!"
  });
};
