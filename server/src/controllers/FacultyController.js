const Faculty = require("../models/Faculty");
const auth = require("../utilities/auth");

//Register Faculty
exports.registerFaculty = async (req, res) => {
  try {
    req.body=req.body.faculty;
    const faculty = await Faculty.findOne({
      $or: [{ facultyID: req.body.facultyID }, { email: req.body.email }]
    });

    if (faculty) {
      return res.status(400).json({
        error: "Faculty with this ID or email already exists"
      });
    }

    const newFaculty = await Faculty.create(req.body);

    const token = auth.signToken(newFaculty._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        userID: newFaculty._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//Faculty Login

exports.loginFaculty = async (req, res) => {
  try {
    

    const faculty = await Faculty.findOne({publicKey: req.body.pubkey })

    if (!faculty) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = auth.signToken(faculty._id);
    res.status(200).json({
      status: "success",
      token,
      data: {
        userID: faculty._id
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().select(["_id", "name"]);

    res.status(200).json({
      status: "success",
      results: faculties.length,
      data: {
        faculties
      }
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getFaculty = async (req, res) => {
  try {
    let faculty = await Faculty.findById(req.params.facultyID);
    if (!faculty) return res.status(404).json({ error: "Invalid Faculty ID" });

    return res.status(200).json({
      name: faculty.name,
      facultyID: faculty.facultyID,
      email: faculty.email,
      department: faculty.department,
      description: faculty.description,
      position: faculty.position
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
