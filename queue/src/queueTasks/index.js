const { RETRY_DELAY } = require('../constants')

const createTask = async (queue, type, data, options = {}) => {
  const { priority, attempts, backoff, removeOnComplete } = options
  return new Promise((res, rej) => {
    const task = queue
      .create(type, data)
      .priority(priority || 'high')
      .attempts(attempts || 8)
      .backoff(backoff || { delay: RETRY_DELAY, type: 'fixed' })
      .removeOnComplete(removeOnComplete || false)
      .save(err => {
        if (err) {
          return rej(err)
        }
        res(task)
      })
  })
}

module.exports = { createTask }
