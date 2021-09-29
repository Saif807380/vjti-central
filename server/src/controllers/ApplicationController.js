const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Record = require("../models/Record");
const bucket = require("../config/firebase");
const axios = require("axios");

//All IDs are default mongo provided IDs
module.exports = {
  async applyForReward(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      const blob = bucket.file(req.file.originalname);
      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;
      console.log(fileUrl);
      // Create writable stream and specifying file mimetype
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });
      console.log(blobWriter);
      blobWriter.on("error", async (err) =>
        res.status(500).json({ error: err.message })
      );
      blobWriter.end(req.file.buffer);
      const { title, description, domainAchievement, facultyID, studentID } =
        req.body;
      const application = await Application.create({
        title: title,
        description: description,
        domainAchievement: domainAchievement,
        files: [fileUrl],
        facultyID: facultyID,
        studentID: studentID
      });
      await Student.findByIdAndUpdate(req.body.studentID, {
        $push: { applications: application }
      });
      await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { applications: application }
      });
      return res.status(201).json({
        message: "Application for reward created, status pending"
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  async getStudentApplications(req, res) {
    try {
      const applications = await Application.find({ studentID: req.params.id });
      return res.status(200).json({ applications });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async getFacultyApplications(req, res) {
    try {
      const applications = await Application.find({ facultyID: req.params.id });
      return res.status(200).json({ applications });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async getApplication(req, res) {
    try {
      const application = await Application.findById(req.params.id)
        .populate("studentID")
        .populate("facultyID")
        .exec();
      if (application) {
        return res.status(200).json(application);
      } else {
        return res.status(404).json({ error: "Invalid Application ID" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async verifyApplication(req, res) {
    try {
      const record = await Record.findOne({
        studentID: req.body.studentID,
        title: req.body.title,
        date: req.body.date
      });

      if (!record) {
        return res.status(200).json({ message: "Verification Successful" });
      } else {
        return res.status(200).json({ message: "Verification Unsuccessful" });
      }
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async approveApplication(req, res) {
    try {
      const reward = req.body.reward;
      let application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Invalid Application ID" });
      }

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be approved" });

      let student = await Student.findById(application["studentID"]);

      if (!student) {
        return res.status(404).json({ error: "Invalid Student ID" });
      }

      console.log(reward, student.publicKey);

      const response = await axios.post(
        process.env.VJ_CHAIN_NODE_URL + "/rewardStudent",
        {
          receiver_public_key: student.publicKey,
          bounty: reward
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status !== 200) {
        return res
          .status(500)
          .json({ error: "An error occurred while transfering the reward" });
      }

      console.log(response.data);

      await Record.create({
        applicationID: req.params.id,
        studentID: application.studentID,
        facultyID: application.facultyID,
        domainAchievement: application.domainAchievement,
        title: req.body.title,
        date: req.body.date
      });

      application.status = "Accepted";
      application.reward = reward;
      await application.save();

      return res.status(200).json({ message: "Application approved" });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async rejectApplication(req, res) {
    try {
      let application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Invalid Application ID" });
      }

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be rejected" });

      application.status = "Rejected";
      await application.save();

      return res.status(200).json({
        message: "Application rejected by faculty"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },
  async updateApplication(req, res) {
    try {
      let application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Invalid Application ID" });
      }

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be updated" });

      let altered = false;
      if (req.body.hasOwnProperty("domainAchievement")) {
        application["domainAchievement"] = req.body["domainAchievement"];
        altered = true;
      }

      if (req.body.hasOwnProperty("title")) {
        application.title = req.body.title;
        altered = true;
      }

      if (req.body.hasOwnProperty("description")) {
        application.description = req.body.description;
        altered = true;
      }

      if (req.body.hasOwnProperty("links")) {
        application.links = req.body.links;
        altered = true;
      }

      if (!altered) {
        return res.status(200).json({
          status: "OK",
          message: "Nothing to be updated"
        });
      }
      await application.save();
      return res.status(200).json({
        status: "OK",
        message: "Application updated successfully"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  },

  async deleteApplication(req, res) {
    try {
      let application = await Application.findById(req.params.id);
      if (!application)
        return res.status(404).json({ error: "Invalid Application ID" });

      if (application.status !== "Pending")
        return res
          .status(404)
          .json({ error: "Only pending applications can be deleted" });

      await application.remove();
      await Student.updateOne(
        { _id: application.studentID },
        { $pull: { applications: req.params.id } }
      );
      await Faculty.updateOne(
        { _id: application.facultyID },
        { $pull: { applications: req.params.id } }
      );
      return res.status(200).json({
        status: "OK",
        message: "Application deleted successfully"
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
};
