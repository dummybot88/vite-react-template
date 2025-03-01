import buildApp, { log } from './buildApp'
import { config } from '../config'

const app = buildApp()

app.listen(config.apiSimulator.port, () =>
  log.info(`BFF Mock listening on  http://localhost:${config.apiSimulator.port}`)
)
