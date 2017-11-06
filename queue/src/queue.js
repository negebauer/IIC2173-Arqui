/* eslint-disable no-console */

const Kue = require('kue')
const { REDIS_PORT, REDIS_HOST, REDIS_PASS } = require('./constants')

const { PURCHASE } = require('./constants').QUEUE_TASKS
const { processPurchase } = require('./queueTasks/purchase')

const redisConfig = {
  redis: {
    port: REDIS_PORT,
    host: REDIS_HOST,
    auth: REDIS_PASS,
    options: {
      no_ready_check: false,
    },
  },
}

const queue = Kue.createQueue(redisConfig)
queue.watchStuckJobs(1000 * 10)

queue.on('ready', () => {
  console.info('Queue is ready!')
})

queue.on('error', err => {
  console.error('There was an error in the main queue!')
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})

queue.process(PURCHASE, 10, processPurchase)

module.exports = queue
