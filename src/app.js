import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import logger from './utils/logger'
import config from './utils/config'
import mongoose from 'mongoose'
import middleware from './utils/middleware'

mongoose.set('strictQuery', false)

if (typeof config.MONGODB_URI === 'string') {
  logger.info('connecting to', config.MONGODB_URI)
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('Connected to MongoDB')
    })
    .catch(error => {
      if (
        error &&
        typeof error === 'object' &&
        error.message &&
        typeof error.message === 'string'
      ) {
        logger.error('Error connecting to MongoDB', error.message)
      }
    })
}

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(express.static('dist'))
app.set('trust proxy', true)
app.use(middleware.requestLogger)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
