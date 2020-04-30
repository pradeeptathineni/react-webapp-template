const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./utils/logger");

const app = express();

// use logger streamed with ist and utc
app.use(require("morgan")("combined", { stream: logger.stream }));
// open access cross-domain requests
app.use(require("cors")());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// serve the static "build" folder, which is the output of our React.js codebase build
app.use(express.static(path.join(__dirname, "build")));

// Routes
const exampleRouter = require("./routes/example");

app.use("/example", exampleRouter);

// WHAT THE HELL DOES THIS DO ???
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.get("/error", () => {
//   throw new Error();
// });

// default error handler
app.use((err, req, res, next) => {
  logger.error("Internal Server Error");
  res.status(500).send("500. Internal Server Error");
  next();
});

// const port = process.env.PORT || 3010;
app.listen(3010, function () {
  logger.debug("CORS-enabled web server listening on port 3010");
});
