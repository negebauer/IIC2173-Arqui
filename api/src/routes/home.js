const Router = require('koa-router')
const _ = require('lodash')
const uuid = require('uuid/v4')

const User = require('../models/user')
const { validationError, loginError } = require('../helpers/errors')

const router = new Router()

router.post('signUp', 'signup', async ctx => {
  const attrs = _.pick(ctx.request.body, [
    'firstName',
    'lastName',
    'mail',
    'address',
    'password',
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

module.exports = router
