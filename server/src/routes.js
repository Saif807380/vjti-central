const StudentController = require("./controllers/StudentController");
const FacultyController = require("./controllers/FacultyController");
const ApplicationController = require("./controllers/ApplicationController");
const uploader = require("./utilities/uploader");
const auth = require("./middleware/auth");
const authOtp = require("./controllers/AuthController");
 
module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Connected");
  });

  //Student Routes
  app.post(
    "/api/student/register",
    auth.verifyOTP,
    StudentController.registerStudent
  );
  app.post("/api/student/login", StudentController.loginStudent);
  app.get("/api/student", auth.loginRequired, StudentController.getAllStudents);
  app.get(
    "/api/student/:id/applications",
    auth.loginRequired,
    ApplicationController.getStudentApplications
  );
  app.get(
    "/api/student/:studentID",
    auth.loginRequired,
    StudentController.getStudent
  );

  //Faculty Routes
  app.post("/api/sendOtpRegister", authOtp.sendOTP);

  app.post(
    "/api/faculty/register",
    FacultyController.registerFaculty
  );
  app.get("/api/student/:id/rank",auth.loginRequired,StudentController.getStudentRank);

  app.post("/api/faculty/login", FacultyController.loginFaculty);
  app.get(
    "/api/faculty",
    auth.loginRequired,
    FacultyController.getAllFaculties
  );
  app.get(
    "/api/faculty/:facultyID",
    auth.loginRequired,
    FacultyController.getFaculty
  );
  app.get(
    "/api/faculty/:id/applications",
    auth.loginRequired,
    ApplicationController.getFacultyApplications
  );

  //Application Routes
  app.post(
    "/api/applications/apply",
    auth.loginRequired,
    uploader.single("file"),
    ApplicationController.applyForReward
  );
  app.get(
    "/api/applications/:id",
    auth.loginRequired,
    ApplicationController.getApplication
  );
 
  app.post(
    "/api/applications/:id/approve",
    auth.loginRequired,
    ApplicationController.approveApplication
  );
  app.post(
    "/api/applications/:id/reject",
    auth.loginRequired,
    ApplicationController.rejectApplication
  );
  app.put(
    "/api/applications/:id",
    auth.loginRequired,
    ApplicationController.updateApplication
  );
  app.delete(
    "/api/applications/:id",
    auth.loginRequired,
    ApplicationController.deleteApplication
  );
};
