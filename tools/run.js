/**
 * Created by Wu Jian Ping on 2017/2/17.
 */

import { logger } from './libs/utils'

const run = async (task, options) => {
  const start = new Date()
  logger.chalk(`Starting '${task.name}${options ? ` (${JSON.stringify(options)})` : ''}'...`)
  let resolution = await task.func(options)
  const end = new Date()
  const time = end.getTime() - start.getTime()
  logger.info(`Finished '${task.name}${options ? ` (${JSON.stringify(options)})` : ''}' after ${time} ms`)
  return resolution
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename] // eslint-disable-line no-underscore-dangle
  const task = require(`./${process.argv[2]}.js`).default // eslint-disable-line import/no-dynamic-require
  run(task).catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })
}

export default run
