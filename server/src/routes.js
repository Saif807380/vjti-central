const authStudentController = require("./controllers/studentController/authStudentController");
const authFacultyController = require("./controllers/facultyController/authFacultyController");
const studentController = require("./controllers/studentController/studentController");
const facultyController = require("./controllers/facultyController/facultyController");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });

  //Student Routes
  app.post("/api/student/register", authStudentController.registerStudent);
  app.post("/api/student/login", authStudentController.loginStudent);
  app.get("/api/student", studentController.getAllStudents);

  //Faculty Routes
  app.post("/api/faculty/register", authFacultyController.registerFaculty);
  app.post("/api/faculty/login", authFacultyController.loginFaculty);
  app.get("/api/faculty", facultyController.getAllFaculties);
};
