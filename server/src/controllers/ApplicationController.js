const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Record = require("../models/Record");
const mongoose = require("mongoose");
const bucket = require("../config/firebase");
//All IDs are default mongo provided IDs
module.exports = {

  async applyForReward(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
      const blob = await bucket.file(req.file.originalname);    
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
      blobWriter.on("error", async (err) => res.status(500).json({ error: err.message }));
      blobWriter.end(req.file.buffer);   
      const { title, description, domainAchievement, facultyID, studentID} = req.body;
      const application = await Application.create({
        title:title,
        description: description,
        domainAchievement:  domainAchievement,
        files: fileUrl, 
        facultyID:facultyID,
        studentID:studentID,
      });
      await Student.findByIdAndUpdate(req.body.studentID, {
        $push: { applications: application }
      });
      await Faculty.findByIdAndUpdate(req.body.facultyID, {
        $push: { applications: application }
      });
      res.status(201).json({
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
  }

};
