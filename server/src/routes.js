const authStudentController = require("./controllers/studentController/authStudentController");
const authFacultyController = require("./controllers/facultyController/authFacultyController");
const studentController = require("./controllers/studentController/studentController");
const facultyController = require("./controllers/facultyController/facultyController");
const applicationController = require("./controllers/ApplicationController");
const uploader = require("./utilities/uploader");
module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });

  //Student Routes
  app.post("/api/student/register", authStudentController.registerStudent);
  app.post("/api/student/login", authStudentController.loginStudent);
  app.get("/api/student", studentController.getAllStudents);
  app.get(
    "/api/student/:id/applications",
    applicationController.getStudentApplications
  );

  //Faculty Routes
  app.post("/api/faculty/register", authFacultyController.registerFaculty);
  app.post("/api/faculty/login", authFacultyController.loginFaculty);
  app.get("/api/faculty", facultyController.getAllFaculties);
  app.get("/api/faculty/:facultyID", facultyController.getFaculty);
  app.get(
    "/api/faculty/:id/applications",
    applicationController.getFacultyApplications
  );

  //Application Routes
  app.post(
    "/api/applications/apply",
    uploader.single("file"),
    applicationController.applyForReward
  );
  app.get("/api/applications/:id", applicationController.getApplication);
};
