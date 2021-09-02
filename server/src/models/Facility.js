const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  facilityID: {
    type: Number,
    required: true,
    unique: true
  },
  facilityType: {
    type: String,
    enum: ["Canteen", "Library", "Xerox"],
    required: true
  },
  location: {
    type: String
  }
});

const Facility = mongoose.model("facility", FacilitySchema);
module.exports = Facility;
