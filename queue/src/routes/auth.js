const { API_QUEUE_SECRET } = require('../constants')

function unauthorized(ctx) {
  const error = new Error('Unauthorized')
  ctx.status = 401
  return (ctx.body = error)
}

module.exports = async (ctx, next) => {
  const secret = ctx.request.headers.secret
  if (!secret === API_QUEUE_SECRET) {
    return unauthorized(ctx)
  }
  return next()
}
