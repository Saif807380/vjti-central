require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");
const config = require("./config");
const dbconnect = require("./config/dbconnect.js");

const app = express();

app.use(express.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(morgan("combined"));

routes(app);

dbconnect();

let port = config.port;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
