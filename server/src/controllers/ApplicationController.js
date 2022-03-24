const Application = require("../models/Application");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Record = require("../models/Record");
const SignTransaction = require("../utilities/SignTransaction");
const bucket = require("../config/firebase");
const axios = require("axios");
const path = require("path");
const pdfparse = require("pdf-parse");
const removeDiacritics = require("diacritics").remove;
const removePunctuation = require("remove-punctuation");
const stringSimilarity = require("string-similarity");

//All IDs are default mongo provided IDs
module.exports = {
  async applyForReward(req, res) {
    try {
      let ocrText;
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded"
        });
      }

      pdfparse(req.file.buffer).then(async function (data) {
        ocrText = removePunctuation(
          removeDiacritics(
            data.text.toLowerCase().split("\n").join("").split(" ").join("")
          )
        );
        const existingApplications = await Application.find({
          studentID: req.body.studentID
        });
        
        for(let i=0;i<existingApplications.length;i++){
          const result=stringSimilarity.compareTwoStrings(existingApplications[i].ocrText,ocrText);
      
          if(result>0.9){
            return res.status(400).json({
            error: "An application for this achievement already exists"
          });
          }
        }
     
        const fileName = `${path.parse(req.file.originalname).name}_${
          req.body.studentID
        }_${Date.now()}`;
        const blob = bucket.file(fileName);
        const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURI(blob.name)}?alt=media`;

        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype
          }
        });

        blobWriter.on("error", async (err) =>
          res.status(500).json({ error: err.message })
        );
        blobWriter.end(req.file.buffer);

        const application = await Application.create({
          ...req.body,
          ocrText: ocrText,
          files: [fileUrl]
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
      student.coinsAchieved += reward;
      await student.save();
      console.log(reward, student.publicKey);
      
      let msg = {
        'appln_id': req.params.id,
        'status': 'Approved'
      }

      const response = await axios.post(
        process.env.VJ_CHAIN_NODE_URL + "/makeTransaction",
        {
          sender_public_key: process.env.FACULTY_PUBLIC_KEY,
          receiver_public_key: student.publicKey,
          bounty: reward,
          message: JSON.stringify(msg)
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

      //console.log(response.data);
      tx_to_be_signed = response.data.sign_this;
      tx_to_be_sent = response.data.send_this;
      sig = SignTransaction.sign(tx_to_be_signed);

      const response_txn = await axios.post(
        process.env.VJ_CHAIN_NODE_URL + "/sendTransaction",
        {
          signature: sig,
          transaction: tx_to_be_sent
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response_txn.status !== 200) {
        return res.status(500).json({
          error:
            "An error occurred while transfering the reward. Invalid Transaction on VJChain"
        });
      }
     

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
