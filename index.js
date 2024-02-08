import app from './src/app.js'
import config from './src/utils/config.js'
import logger from './src/utils/logger.js'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
