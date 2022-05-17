const mysql = require("mysql");
const pronouncing = require("pronouncing");

var config = {
  user: "root",
  password: "pass0000",
  server: "localhost",
  database: "entries",
};

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass0000",
  database: "entries",
  options: { trustServerCertificate: true },
});

var connect = function () {
  console.log("Connecting to DB ...");
  connection.connect(function (err) {
    if (err) {
      console.log("Unable to connect to DB!");
      console.log(err);
    }

    console.log("Connected to DB!");
  });
};

var search = function (req, res) {
  console.log("Searching from DB: " + req.body.word);
  console.log(
    "Query is running: " +
      `select * from entries where word like '${req.body.word}%' order by word asc`
  );
  connection.query(
    `select * from entries where word like '${req.body.word}%' order by word asc`,
    function (err, dataset) {
      console.log("Entered into SELECT");
      if (err) console.log(err);

      //   console.log(dataset);
      return res.send({
        pron: pronouncing.phonesForWord(req.body.word),
        result: dataset,
      });
    }
  );
};

exports.connect = connect;
exports.search = search;
