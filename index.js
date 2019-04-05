const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();

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
