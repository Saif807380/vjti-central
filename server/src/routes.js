const authController = require("./controllers/authController");

module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });
  app.post("/api/registerStudent", authController.registerStudent);
  app.post("/api/registerFaculty", authController.registerFaculty);
  app.post("/api/loginStudent", authController.loginStudent);
  app.post("/api/loginFaculty", authController.loginFaculty);
};
