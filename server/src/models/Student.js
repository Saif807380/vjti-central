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
    required: true,
    select: false
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
  publicKey: {
    type: String,
    default: "" // remove this after connecting to vj chain
  },
  credentialsURL: {
    type: String,
    default: ""
  },
  rank: {
    type: Number,
    required: false,
    default: 0
  },
  coinsAchieved: {
    type: Number,
    required: false,
    default: 0
  },
  admissionYear: {
    type: Number,
    required: true
  },
  applications: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application"
      }
    ],
    default: []
  }
});

student.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

student.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model("student", student);

module.exports = Student;
