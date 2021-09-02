const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  notification_id: {
    type: Number,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  faculty_id: {
    type: Schema.Types.ObjectId,
    ref: "faculty",
    required: true
  }
});

const Notification = mongoose.model("notification", NotificationSchema);
module.exports = Notification;
