const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  facultyID: {
    type: Schema.Types.ObjectId,
    ref: "faculty",
    required: true
  }
});

const Notification = mongoose.model("notification", NotificationSchema);
module.exports = Notification;
