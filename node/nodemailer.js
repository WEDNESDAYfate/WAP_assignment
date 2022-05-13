var mail = require('nodemailer');

var transporter = mail.createTransport({
    service: 'gmail',
    auth: {
        user: 'g.lkhagvazaya@gmail.com',
        pass: '**********'
    }
});

var mailOptions = {
    from: 'g.lkhagvazaya@gmail.com',
    to: 'lgantulga@miu.edu',
    subject: ' Hello World!',
    text: ' Im node hello zaya! '
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(Error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});