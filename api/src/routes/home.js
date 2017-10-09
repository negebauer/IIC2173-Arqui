const Router = require("koa-router")
const _ = require("lodash")
const uuid = require("uuid/v4")

const User = require("../models/user")

const router = new Router()

function generateMessage(err) {
  let msgs = []
  Object.keys(err.errors).forEach(key => {
    msgs.push(err.errors[key].message)
  })
  const error = new Error()
  error.message = msgs.reverse().join("\n")
  return error
}

function loginError(ctx) {
  ctx.status = 403
  const error = new Error()
  error.message = "Invalid credentials."
  return (ctx.body = error)
}

router.post("signUp", "signup", async ctx => {
  const attrs = _.pick(ctx.request.body, [
    "firstName",
    "lastName",
    "mail",
    "address",
    "password",
  ])
  const user = new User(attrs)
  try {
    user.token = uuid()
    await user.save()
  } catch (err) {
    ctx.status = 406
    return (ctx.body = generateMessage(err))
  }
  ctx.status = 201
  return (ctx.body = { token: user.token })
})

router.post("signIn", "login", async ctx => {
  const user = await User.findOne({ mail: ctx.request.body.mail })
  if (!user) {
    return loginError(ctx)
  }
  const isMatch = await user.comparePassword(ctx.request.body.password)
  if (!isMatch) {
    return loginError(ctx)
  }
  if (user.token) {
    return (ctx.body = { token: user.token })
  }
  user.token = uuid()
  await user.save()
  return (ctx.body = { token: user.token })
})

module.exports = router
