const axios = require('axios')
const { createTask } = require('./index')
const { PURCHASE } = require('../constants').QUEUE_TASKS
const {
  COMPLETE,
  FAILED_ATTEMPT,
  FAILED,
} = require('../constants').QUEUE_EVENTS
const {
  API_URI,
  API_QUEUE_SECRET,
  ARQUITRAN_URI,
  ARQUITRAN_TOKEN,
  ARQUITRAN_ID,
} = require('../constants')

const createPurchase = async (queue, userId, productId, sentAt) => {
  const task = await createTask(queue, PURCHASE, {
    userId,
    productId,
    sentAt,
    title: `product ${productId} by ${userId}`,
  })
  task.on(COMPLETE, result => completePurchase(task, result))
  task.on(FAILED_ATTEMPT, (err, attempts) =>
    failedAttemptPurchase(task, err, attempts)
  )
  task.on(FAILED, err => failedPurchase(task, err))
  return task
}

const completePurchase = async (task, result) => {
  const { userId, productId, sentAt } = task.data
  const { transactionId } = result
  task.log(`Completada compra el ${new Date()}`)
  task.log(`respuesta: ${JSON.stringify(result.status)}`)
  task.log(`transacción: ${transactionId}`)
  try {
    await axios.post(
      `${API_URI}/orders/resolved`,
      { userId, productId, sentAt, transactionId },
      { headers: { Secret: API_QUEUE_SECRET } }
    )
  } catch (err) {
    task.log(`No se pudo validar compra error ${err}`)
  }
}

const failedAttemptPurchase = (task, err, attempts) => {
  task.log(`Intento de compra fallido el ${new Date()} intentos ${attempts}`)
  task.log(err)
}

const failedPurchase = (task, err) => {
  task.log(`Compra fallida el ${new Date()}`)
  task.log(err)
}

const processPurchase = async (task, ctx, done) => {
  const { userId, productId } = task.data
  try {
    const response = await axios.post(`${ARQUITRAN_URI}/transactions/`, {
      application_token: ARQUITRAN_TOKEN,
      id: ARQUITRAN_ID,
      user_id: userId,
      product: productId,
      amount: 1,
    })
    const transactionId = response.headers.location
    done(null, { status: response.data.status, transactionId })
  } catch (err) {
    const { transaction_status_code, description } = err.response.data.status
    done(`${err.message}\n\t${transaction_status_code} - ${description}`)
  }
}

module.exports = { createPurchase, processPurchase }
