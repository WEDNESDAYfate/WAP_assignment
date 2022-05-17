const express = require("express");
const bodyParser = require("body-parser");

const db = require("./word");
const app = express();

db.connect();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/search", function (req, res) {
  console.log(req.body.word);
  db.search(req, res);
});

app.listen(3000, function () {
  console.log("Server is running: 3000 port");
});
