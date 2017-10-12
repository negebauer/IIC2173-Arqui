const request = require('axios')
const {
  ARQUITRAN_URI,
  MAX_REQUEST_ATTEMPTS,
  MAX_REQUEST_TIMEOUT,
} = require('../constants')

const getArquitran = async endPoint => {
  let attemptsLeft = MAX_REQUEST_ATTEMPTS
  while (attemptsLeft) {
    try {
      const response = await request.get(ARQUITRAN_URI + endPoint, {
        timeout: MAX_REQUEST_TIMEOUT,
      })
      return response.data
    } catch (err) {
      console.log(err.message) // eslint-disable-line no-console
    }
    attemptsLeft--
  }
}

module.exports = getArquitran
