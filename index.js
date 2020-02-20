const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const body_parser = require("body-parser");
const searchInfo = require("./routes/searchInfo");
const express = require("express");

/* eslint-disable no-console */

const port = process.env.PORT || 3001;
const app = express();

app.use(
  body_parser.json({ limit: "100000kb" }),
  cors(),
  helmet(),
  compression(),
  searchInfo
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Server listening: http://localhost:%s", port);
  }
});
