/* eslint no-console:0 */

const kue = require('kue')

const PORT = process.env.PORT || 3003
const redisConfig = {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    auth: process.env.REDIS_PASS || '',
    options: {
      no_ready_check: false,
    },
  },
}

kue.createQueue(redisConfig)
kue.app.listen(PORT || '3003', err => {
  if (err) {
    return console.error('Failed', err)
  }
  console.log(`Listening on port ${PORT}`)
})
kue.app.set('title', 'Kue')
