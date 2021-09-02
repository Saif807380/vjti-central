const authController = require("./controllers/authController");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });

  // Student routes
  app.post("/api/student/register", authController.registerStudent);
  app.post("/api/student/login", authController.loginStudent);

  // Faculty routes
  app.post("/api/faculty/register", authController.registerFaculty);
  app.post("/api/faculty/login", authController.loginFaculty);
};
