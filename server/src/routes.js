const StudentController = require("./controllers/StudentController");
const FacultyController = require("./controllers/FacultyController");
const ApplicationController = require("./controllers/ApplicationController");
const uploader = require("./utilities/uploader");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });

  //Student Routes
  app.post("/api/student/register", StudentController.registerStudent);
  app.post("/api/student/login", StudentController.loginStudent);
  app.get("/api/student", StudentController.getAllStudents);
  app.get(
    "/api/student/:id/applications",
    ApplicationController.getStudentApplications
  );
  app.get("/api/student/:studentID", StudentController.getStudent);

  //Faculty Routes
  app.post("/api/faculty/register", FacultyController.registerFaculty);
  app.post("/api/faculty/login", FacultyController.loginFaculty);
  app.get("/api/faculty", FacultyController.getAllFaculties);
  app.get("/api/faculty/:facultyID", FacultyController.getFaculty);
  app.get(
    "/api/faculty/:id/applications",
    ApplicationController.getFacultyApplications
  );

  //Application Routes
  app.post(
    "/api/applications/apply",
    uploader.single("file"),
    ApplicationController.applyForReward
  );
  app.get("/api/applications/:id", ApplicationController.getApplication);
  app.post("/api/applications/verify", ApplicationController.verifyApplication);
  app.post(
    "/api/applications/:id/approve",
    ApplicationController.approveApplication
  );
  app.post(
    "/api/applications/:id/reject",
    ApplicationController.rejectApplication
  );
  app.put("/api/applications/:id", ApplicationController.updateApplication);
  app.delete("/api/applications/:id", ApplicationController.deleteApplication);
};
