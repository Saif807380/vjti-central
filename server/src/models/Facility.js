const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  facility_id: {
    type: Number,
    required: true,
    unique: true
  },
  facility_type: {
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
