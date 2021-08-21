module.exports = (app) => {
  app.get("/api/check", (req, res) => {
    res.json("Hello World");
  });
};
