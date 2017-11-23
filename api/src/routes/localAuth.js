const {
  API_MAILER_SECRET,
  API_QUEUE_SECRET,
  API_TELEGRAM_SECRET,
} = require('../constants')
const User = require('../models/user')

function unauthorized(ctx) {
  ctx.status = 401
  const error = new Error()
  error.message = 'Unauthorized.'
  return (ctx.body = error)
}

module.exports = async (ctx, next) => {
  let type, value
  if (ctx.request.headers.authorization) {
    ;[type, value] = ctx.request.headers.authorization.split(' ') // eslint-disable-line no-extra-semi
  }
  const secret = ctx.request.headers.secret
  if (type === 'token') {
    const user = await User.findOne({ token: value }, { _id: true, mail: true })
    ctx.state.user = user
    if (!user) {
      return unauthorized(ctx)
    }
  } else if (type === 'mail' && secret === API_MAILER_SECRET) {
    const user = await User.findOne({ mail: value }, { _id: true, mail: true })
    ctx.state.user = user
  } else if (type === 'telegram' && secret === API_TELEGRAM_SECRET) {
    const user = await User.findOne(
      { telegram: value },
      { _id: true, mail: true, telegram: true }
    )
    ctx.state.user = user
    if (!user) {
      return unauthorized(ctx)
    }
  } else if (!(!type && secret === API_QUEUE_SECRET)) {
    return unauthorized(ctx)
  }
  return next()
}
