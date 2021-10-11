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
        "Competition",
        "Other"
      ],
      default: "Competition",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    files: {
      type: [
        {
          type: String
        }
      ],
      required: false,
      default: []
    },
    links: {
      type: [
        {
          type: String
        }
      ],
      required: false,
      default: []
    },
    reward: {
      type: Number,
      required: false,
      default: 0
    }
  },
  { timestamps: true }
);

const Application = mongoose.model("application", ApplicationSchema);
module.exports = Application;
