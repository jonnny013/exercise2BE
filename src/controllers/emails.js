import emailService from '../services/emailService.js'
import express from 'express'
import logger from '../utils/logger.js'

const emailRouter = express.Router()

emailRouter.post('/', async (req, res) => {
  try {
    const sendEmail = await emailService.postEmail(req.body)
    return res.status(200).json(sendEmail)
  } catch (error) {
    logger.error(error)
    return res.status(400).send('An error occurred')
  }
})