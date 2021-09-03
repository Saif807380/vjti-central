const Application = require("../models/Application");
//currently document object ID has to be provided for student and faculty
//change this later to actual student and faculty ID
module.exports = {
  async applyForReward(req, res) {
    try {
      const body = req.body;
      var domain_var = "Competition";
      if (body["domain"]) {
        domain_var = body["domain"];
      }
      const application = {
        studentID: body["studentID"],
        facultyID: body["facultyID"],
        domainAchievement: domain_var
      };
      await Application.create(application);
      res
        .status(200)
        .json({
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
