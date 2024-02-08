import Email from '../models/email.js'
import nodemailer from 'nodemailer'

const sendEmail = ({ email }) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  })

  let mailOptions = {
    from: 'me',
    to: email.email,
    subject: email.subject,
    text: email.body,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
}

const postEmail = async ({ email }) => {
  const something = await sendEmail({ email })
  const dateSent = new Date()
  const emailToSend = new Email({
    ...email,
    dateSent
  })
  const savedEmail = await emailToSend.save()
  return savedEmail 
}

export default { postEmail }
