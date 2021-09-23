const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const mongoose = require("mongoose");
const http = require("http");

//All IDs are default mongo provided IDs

module.exports = {
  async applyForReward(req, res) {
    try {
      /*
        TODO: Upload files in req.files to firebase
        and store array of urls in req.body.files
      */
      const application = await Application.create(req.body);
      await Student.findByIdAndUpdate(req.body.studentID, {
        $push: { applications: application }
      });
      await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { applications: application }
      });
      res.status(201).json({
        status: "OK",
        message: "Application for reward created, status pending"
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async getStudentApplications(req, res) {
    try {
      const applications = await Application.find({ studentID: req.params.id });
      res.status(200).json({ applications });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async getFacultyApplications(req, res) {
    try {
      const applications = await Application.find({ facultyID: req.params.id });
      res.status(200).json({ applications });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async getApplication(req, res) {
    try {
      const application = await Application.findById(req.params.id)
        .populate("studentID")
        .populate("facultyID")
        .exec();
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({ error: "Invalid Application ID" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async approveApplication(req, res) {
    try {
      const appln_id = req.params.id;
      const reward = req.body["reward"];
      let application = await Application.findById(appln_id);
      if (application) {
        if (application["status"] != "Pending")
          res
            .status(404)
            .json({ error: "Only pending application can be approved" });
        else {
          let student = await Student.findById(application["studentID"]);
          if (student) {
            var publicKey = student["publicKey"];
            const data = new TextEncoder().encode(
              JSON.stringify({
                receiver_public_key: publicKey,
                bounty: reward
              })
            );
            //assumption that miner is on port 9000 - add env var for this?
            var options = {
              hostname: "127.0.0.1",
              port: 9000,
              path: "/rewardStudent",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length
              }
            };
            const req = http.request(options, (res) => {
              console.log(`statusCode: ${res.statusCode}`);

              res.on("data", (d) => {
                process.stdout.write(d);
              });
            });

            req.on("error", (error) => {
              console.error(error);
            });

            req.write(data);
            req.end();
            console.log(res.statusCode);
            if (res.statusCode == 200) {
              console.log("here");
              application["status"] = "Accepted";
              await application.save();
              res.status(200).json({
                status: "OK",
                message: "Application accepted by faculty"
              });
            } else res.status(404).json({ error: "Call to VJChain failed" });
          } //end of if student
          else {
            res.status(404).json({ error: "Invalid Student ID" });
          }
        } //end of else pending application
      } //end of if application
      else {
        res.status(404).json({ error: "Invalid Application ID" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async rejectApplication(req, res) {
    try {
      const appln_id = req.params.id;
      const reward = req.body["reward"];
      let application = await Application.findById(appln_id);
      if (application) {
        if (application["status"] != "Pending")
          res
            .status(404)
            .json({ error: "Only pending application can be rejected" });
        else {
          application["status"] = "Rejected";
          await application.save();
          res.status(200).json({
            status: "OK",
            message: "Application rejected by faculty"
          });
        }
      } //end of if application
      else {
        res.status(404).json({ error: "Invalid Application ID" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
