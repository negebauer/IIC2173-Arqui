const validationError = err => {
  const msgs = []
  Object.keys(err.errors).forEach(key => {
    msgs.push(err.errors[key].message)
  })
  const error = new Error()
  error.message = msgs.reverse().join('\n')
  return error
}

const loginError = ctx => {
  ctx.status = 403
  const error = new Error()
  error.message = 'Invalid credentials.'
  ctx.body = error
}

module.exports = { validationError, loginError }
