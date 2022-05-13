var http = require('http');
var user = require('./user.js');
var toMail = require('nodemailer')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(toMail.getTestMessageUrl);

    //  console.log(user.getName() + ' lives in ' + user.getLocation() + ' and was born on ' + user.dob);
    res.end();
}).listen(8080);