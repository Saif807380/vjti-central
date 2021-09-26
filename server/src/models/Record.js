const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const record = new mongoose.Schema({
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  applicationID: {
    type: Schema.Types.ObjectId,
    ref: "application",
    required: true
  },
  facultyID: {
    type: Schema.Types.ObjectId,
    ref: "faculty",
    required: true
  },
  domainAchievement: {
    type: String,
    enum: ["Hackathon", "Research Paper", "Committee Position", "Competition"],
    default: "Competition"
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Record = mongoose.model("record", record);
module.exports = Record;
