const request = require('axios')
const {
  API_MAILER_SECRET,
  API_QUEUE_SECRET,
  MAILER_URI,
  QUEUE_URI,
} = require('../constants')

const postMailer = async (endPoint, object) => {
  try {
    const response = await request.post(MAILER_URI + endPoint, object, {
      headers: { Secret: API_MAILER_SECRET },
    })
    return response.status
  } catch (err) {
    console.log(err.message) // eslint-disable-line no-console
  }
}

const postQueue = async (endPoint, object) => {
  try {
    const response = await request.post(QUEUE_URI + endPoint, object, {
      headers: { Secret: API_QUEUE_SECRET },
    })
    return response.status
  } catch (err) {
    console.log(err.message) // eslint-disable-line no-console
  }
}

module.exports = { postMailer, postQueue }
