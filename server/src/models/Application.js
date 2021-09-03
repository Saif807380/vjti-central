const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
  {
    studentID: {
      type: Schema.Types.ObjectId,
      ref: "student",
      required: true
    },
    facultyID: {
      type: Schema.Types.ObjectId,
      ref: "faculty",
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
      required: true
    },
    domainAchievement: {
      type: String,
      enum: [
        "Hackathon",
        "Research Paper",
        "Committee Position",
        "Competition"
      ],
      default: "Competition",
      required: true
    }
  },
  { timestamps: true }
);

const Application = mongoose.model("application", ApplicationSchema);
module.exports = Application;