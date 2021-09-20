const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Record = require("../models/Record");
const mongoose = require("mongoose");

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

  async verifyApplication(req,res){
    try{
      console.log("here");
      console.log(req.body)
      const record = await Record.find({ studentID: req.body.studentID, domainAchievement: req.body.domainAchievement , title: req.body.title , date: req.body.date });
      console.log(record);
      if(record==[]){
        res.status(200).json({"message":"Found"});
      }else{
        res.status(200).json({"message":"Not Found"}); 
      }    
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
  async validateApplication(req,res){
    try{
      if(req.body.status=="Approved"){
        await Application.findByIdAndUpdate(req.body.applidationID, {
         status:req.body.status
        });
        //deduct coins from vjtichain
        // add to record schema

      }else{
        await Application.findByIdAndUpdate(req.body.applicationID, {
          status:req.body.status
         });
      } 
      res.status(200).json({ "message":"Validated" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },
 

};
