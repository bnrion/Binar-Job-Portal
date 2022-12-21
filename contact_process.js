const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const to = "rockybd1995@gmail.com";
    const from = req.body.email;
    const name = req.body.name;
    const subject = req.body.subject;
    const number = req.body.number;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'your-gmail-address@gmail.com',
            pass: 'your-gmail-password'
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: `
      <!DOCTYPE html>
      <html lang='en'>
      <head>
        <meta charset='UTF-8'>
        <title>Express Mail</title>
      </head>
      <body>
        <table style='width: 100%;'>
          <thead style='text-align: center;'>
            <tr>
              <td style='border:none;' colspan='2'>
                <a href='#'><img src='img/logo.png' alt=''></a><br><br>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style='border:none;'><strong>Name:</strong> ${name}</td>
              <td style='border:none;'><strong>Email:</strong> ${from}</td>
            </tr>
            <tr>
              <td style='border:none;'><strong>Subject:</strong> ${subject}</td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td colspan='2' style='border:none;'>${message}</td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('An error occurred');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
});

app.listen(3000, () => console.log('Server started'));
