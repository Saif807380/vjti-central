const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const faculty = new mongoose.Schema({
  facultyID: {
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
  position: {
    type: String
  },
  description: {
    type: String
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

faculty.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Faculty = mongoose.model("faculty", faculty);

module.exports = Faculty;
