const nodemailer = require('nodemailer')
const constants = require('./constants')

function processMail(mail_reciver, mail_message, mail_subject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'IIC2173grupo1@gmail.com',
      pass: constants.SECRET.MAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'Grupo1 <IIC2173grupo1@gmail.com>',
    to: mail_reciver,
    subject: mail_subject,
    text: mail_message,
  }

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      //console.log('Error:' + err)
    } else if (res) {
      //console.log('Email Sent')
    }
  })
}

module.exports = {
  processMail,
}
