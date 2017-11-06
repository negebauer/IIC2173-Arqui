const nodemailer = require('nodemailer')
const { MAIL_NAME, MAIL_USER, MAIL_PASSWORD } = require('../constants')

function processMail(mailReceiver, mailMessage, mailSubject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: `${MAIL_NAME} <${MAIL_USER}>`,
    to: mailReceiver,
    subject: mailSubject,
    html: mailMessage,
  }

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      //console.log('Error:' + err)
    } else if (res) {
      //console.log('Email Sent')
    }
  })
}

module.exports = processMail
