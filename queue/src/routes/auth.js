const { API_QUEUE_SECRET } = require('../constants')

function unauthorized(ctx) {
  ctx.status = 401
  const error = new Error()
  error.message = 'Unauthorized.'
  return (ctx.body = error)
}

module.exports = async (ctx, next) => {
  const secret = ctx.request.headers.secret
  if (!secret === API_QUEUE_SECRET) {
    return unauthorized(ctx)
  }
  return next()
}
