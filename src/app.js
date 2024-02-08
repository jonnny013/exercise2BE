import express from 'express'
import cors from 'cors'
import logger from './utils/logger.js'
import config from './utils/config.js'
import mongoose from 'mongoose'
import middleware from './utils/middleware.js'
import morgan from 'morgan'

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
app.use(express.static('dist'))
app.set('trust proxy', true)

app.use(morgan('tiny'))


app.use(middleware.unknownEndpoint)

export default app
