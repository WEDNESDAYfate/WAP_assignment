
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/calculator.html");
});

app.post("/", function (req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var op = req.body.operator;
    var result = 0;
    switch (op) {
        case 'sub':
            result = num1 - num2;
            break;
        case 'add':
            result = num1 + num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;

        default:
            break;
    }
    res.send(
        `<div style="text-align: center; margin-top: 50px;">
    <h1>The Answer is: ${result}</h1>
    <a href="/">Another calculation</a>
    </div>`
    );
});

app.listen(3000, () => {
    console.log("Server is running on 3000 port");
});
