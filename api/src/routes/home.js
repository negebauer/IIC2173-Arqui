const Router = require('koa-router')
const _ = require('lodash')
const uuid = require('uuid/v4')
const os = require('os')

const User = require('../models/user')
const { validationError, loginError } = require('../helpers/errors')

const router = new Router()

router.get('/', async ctx => {
  ctx.body = {
    hostname: os.hostname(),
    alive: true,
    time: new Date(),
  }
})

router.post('signUp', 'signup', async ctx => {
  const attrs = _.pick(ctx.request.body, [
    'firstName',
    'lastName',
    'mail',
    'address',
    'password',
    'telegram',
  ])
  const user = new User(attrs)
  try {
    user.token = uuid()
    await user.save()
  } catch (err) {
    ctx.status = 406
    ctx.body = validationError(err)
    return
  }
  ctx.status = 201
  ctx.body = { token: user.token }
})

router.post('signIn', 'login', async ctx => {
  const user = await User.findOne({ mail: ctx.request.body.mail })
  if (!user) {
    return loginError(ctx)
  }
  const isMatch = await user.comparePassword(ctx.request.body.password)
  if (!isMatch) {
    return loginError(ctx)
  }
  if (user.token) {
    ctx.body = { token: user.token }
    return
  }
  user.token = uuid()
  await user.save()
  ctx.body = { token: user.token }
})

router.post('signTelegram', 'telegram', async ctx => {
  const { mail, password, telegram } = ctx.request.body
  const user = await User.findOne({ mail })
  if (!user) {
    return loginError(ctx)
  }
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return loginError(ctx)
  }
  try {
    const test = await User.findOne({ telegram })
    if (test) {
      throw new Error()
    }
    await user.update({ telegram })
  } catch (err) {
    ctx.status = 406
    ctx.body = validationError(err)
    return
  }
  ctx.body = { message: "Success on adding user's telegram." }
})

module.exports = router
