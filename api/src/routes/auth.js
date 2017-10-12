const User = require('../models/user')

function unauthorized(ctx) {
  ctx.status = 401
  const error = new Error()
  error.message = 'Not authorized.'
  return (ctx.body = error)
}

module.exports = async (ctx, next) => {
  // return await next() // For dev token ignoring
  const token = ctx.request.headers.authorization
  if (!token) {
    return unauthorized(ctx)
  }
  const user = await User.findOne({ token }, { password: false })
  if (!user) {
    return unauthorized(ctx)
  }
  ctx.state.user = user
  await next()
}
