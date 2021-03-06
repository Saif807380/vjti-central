require("dotenv").config();
const mongoose = require("mongoose");

function connect() {
  const mongooseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: process.env.NODE_ENV !== "prod"
  };

  let connectionString = process.env.MONGO_URI_DEV;
  if (process.env.NODE_ENV === "prod") {
    connectionString = process.env.MONGO_URI_PROD;
  }

  if (process.env.NODE_ENV == "test") {
    console.log("Node env testing detected");
    //connectionString = process.env.MONGO_URI_PROD;
  }

  mongoose.connect(connectionString, mongooseOptions);
  mongoose.Promise = global.Promise;
  mongoose.connection.on("open", () => console.log(`MongoDB Connected`));
  mongoose.connection.on("error", console.error.bind(console, "MongoDB Error"));
}

module.exports = connect;
