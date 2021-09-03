const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const mongoose = require("mongoose");
//currently document object ID has to be provided for student and faculty
//change this later to actual student and faculty ID
module.exports = {
  async applyForReward(req, res) {
    try {
      const body = req.body;
      var domain_var = "Competition";
      var appln_id = mongoose.Types.ObjectId();
      if (body["domain"]) {
        domain_var = body["domain"];
      }
      const application = {
        _id: appln_id,
        studentID: body["studentID"],
        facultyID: body["facultyID"],
        domainAchievement: domain_var
      };
      await Application.create(application);
      let student = await Student.findByIdAndUpdate(req.body.studentID, {
        $push: { applications: application }
      });
      let faculty = await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { applications: application }
      });
      res.status(200).json({
        status: "OK",
        message: "Application for reward created, status pending"
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  async getAllApplications(req, res) {
    try {
      const student = req.params.id;
      let applications = await Application.find({ studentID: student });
      res.status(200).json({ applications });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
