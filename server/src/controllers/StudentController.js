const Student = require("../models/Student");
const axios = require("axios");
const auth = require("../utilities/auth");
const bucket = require("../config/firebase");
const WalletCreation = require("../utilities/WalletCreation");
const EncryptCredentials = require("../utilities/EncryptCredentials");

//Register Student
exports.registerStudent = async (req, res) => {
  try {
    req.body = req.body.student;
    const student = await Student.findOne({
      $or: [{ studentID: req.body.studentID }, { email: req.body.email }]
    });

    if (student) {
      return res.status(400).json({
        error: "Student with this ID or email already exists"
      });
    }
    let publicKey = req.body.customPublicKey;
    let privateKey = "";
    let fileUrl = "";
    delete req.body.customPublicKey;

    if (!publicKey) {
      let keys = WalletCreation.createWallet();
      publicKey = keys.publicKey;
      privateKey = keys.privateKey;

      const data = {
        name: req.body.name,
        email: req.body.email,
        publicKey: publicKey,
        privateKey: privateKey,
        pin: req.body.pin
      };

      const encrypted = EncryptCredentials.encryptCredentials(
        data,
        req.body.passphrase
      );

      const filename = String(req.body.studentID) + "_credentials.txt";
      const blob = bucket.file(filename);
      fileUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: "text/plain"
        }
      });
      blobWriter.on("error", async (err) =>
        res.status(500).json({ error: err.message + " blob" })
      );
      blobWriter.write(encrypted, () => {
        console.log("written file contents");
      });
      blobWriter.end();
    }

    const newStudent = await Student.create({
      ...req.body,
      publicKey: publicKey,
      credentialsURL: fileUrl
    });
    const token = auth.signToken(newStudent._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        userID: newStudent._id,
        keys: {
          publicKey: publicKey,
          privateKey: privateKey
        }
      }
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
};

//Student Login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email }).select("+password");

    if (
      !student ||
      !(await student.correctPassword(password, student.password))
    ) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(student._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: student._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getStudentRank = async (req, res) => {
  try {
    const users = await Student.find({});
    users.sort((a, b) => b.coinsAchieved - a.coinsAchieved);

    for (let i = 0; i < users.length; i++) {
      let totalPoints = users[i].coinsAchieved;
      let usersWithRank = users.filter(
        (user) => user.coinsAchieved === totalPoints
      );
      for (let user of usersWithRank) {
        user.rank = i + 1;
        // if (user._id == req.params.id) {
        //   return res.status(200).json({ message: user.rank });
        // }
        await user.save();
      }
      i += usersWithRank.length - 1;
    }

    const rank = await Student.findById(req.params.id).select("rank").lean();
    return res.status(200).json({ rank: rank.rank });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.studentID);
    if (!student) return res.status(404).json({ error: "Invalid Student ID" });

    const response = await axios.post(
      process.env.VJ_CHAIN_NODE_URL + "/checkBalance",
      {
        public_key: student.publicKey
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status !== 200)
      return res.status(500).json({
        error: "An error occurred while fetching wallet balance from VJ Chain"
      });

    return res.status(200).json({
      name: student.name,
      studentID: student.studentID,
      email: student.email,
      publicKey: student.publicKey,
      department: student.department,
      year: student.admissionYear,
      degree: student.degree,
      coinsAchieved: student.coinsAchieved,
      rank: student.rank,
      walletBalance: response.data,
      credentialsURL: student.credentialsURL
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
