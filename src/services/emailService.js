import Email from "../models/email.js"

const postEmail = async ({email}) => {
  const dateSent = new Date()
  const emailToSend = new Email({
    ...email,
    dateSent
  })
  const savedEmail = await emailToSend.save()
  return savedEmail

}

export default {postEmail}