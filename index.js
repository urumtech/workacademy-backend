const mongoose = require("mongoose");
const config = require("config")
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();

// check the dbConnectionString in the environment variables
if (!config.get("dbConnectionString")) {
  console.error("FATAL ERROR: dbConnectionString is not defined.")
  process.exit(1);
}

// connect to DB
mongoose
  .connect(`${config.get("dbConnectionString")}/workacademy`, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch(err => console.error("Could not connect to MongoDB..", err));


// Parse the body if the request and if there is a json object it populates "req.body"
app.use(express.json());
// Parse the requests with url encoded payloads (key=value&key=value) and populate "req.body"
app.use(express.urlencoded({ extended: true }));
// Use the public folder to serve the static assets such as CSS files or images
app.use(express.static("public"));
// Secure the application by setting HTTP headers
app.use(helmet());
// Log the HTTP requests on the console. We want to have this middleware only on the development
// environment variable name for this is *NODE_ENV*
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
