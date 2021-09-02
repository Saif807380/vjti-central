const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const student = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    enum: ["BTech", "MTech", "MCA", "Diploma"],
    required: true
  },
  degree: {
    type: String,
    enum: ["BTech", "MTech", "MCA", "Diploma"],
    required: true
  },

  admissionYear: {
    type: Number,
    required: true
  },
  acceptedApplications: {
    type: Array,
    default: []
  },
  rejectApplications: {
    type: Array,
    default: []
  }
});

student.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Student = mongoose.model("student", student);

module.exports = Student;
