const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const mongoose = require("mongoose");
import bucket from "../config/firebase";
//All IDs are default mongo provided IDs

module.exports = {
  async applyForReward(req, res) {
    try {
    
        if (!req.files) {
          return res.status(400).send("No file uploaded.");
        }
    
        // Create new blob in the bucket referencing the file
        const files = req.files;
        const blob = bucket.file(files[0].originalname);
  
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURI(blob.name)}?alt=media`;
  
        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: files[0].mimetype
          }
        });
  
        blobWriter.on("error", (err) =>
          res.status(500).json({ error: err.message })
        );
  
        blobWriter.end(files[0].buffer);
      
     const files=imageUrl;
      const { title, description, domainAchievement} = req.body;

      const application = await Application.create({title, description, domainAchievement,files});
      
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
  }
};
