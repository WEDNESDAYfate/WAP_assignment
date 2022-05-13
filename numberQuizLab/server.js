const express = require("express");
const session = require("express-session");
const path = require("path");
var bodyParser = require("body-parser");

const app = express();

app.set(path.join(__dirname, "./views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: "saltie",
        resave: false,
        saveUninitialized: false,
    })
);

const question = {
    1: "3, 1, 4, 1, 5",
    2: "1, 1, 2, 3, 5",
    3: "1, 4, 9, 16, 25",
    4: "2, 3, 5, 7, 11",
    5: "1, 2, 4, 8, 16",
};

const answer = {
    1: 9,
    2: 8,
    3: 36,
    4: 13,
    5: 32,
};
app.get("/", (req, res) => {
    var score = 0;
    var quiz = 1;

    for (const key in req.session) {
        switch (key) {
            case "cookie":
                continue;
            case "quiz":
                quiz = req.session["quiz"];
                break;
            case "score":
                score = req.session["score"];
                break;
        }
    }

    res.render("quiz", {
        question: question[quiz],
        score: score,
        quiz: quiz,
    });
});

app.post("/", (req, res) => {
    var quiz = parseInt(req.body.quiz) + 1;
    var score = parseInt(req.body.score);
    if (req.body.answer == answer[req.body.quiz]) {
        score++;
    }

    req.session["score"] = score;
    req.session["quiz"] = quiz;

    res.redirect(303, "/");
});

app.listen(3000, () => {
    console.log("Server is running on 3000 port");
});

