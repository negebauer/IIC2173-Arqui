const Router = require('koa-router')
const Dummy = require('../models/dummy')

const router = new Router()

router.get('/', async ctx => {
  const dummies = await Dummy.find({}, { _id: false, i: true }).lean()
  ctx.body = { dummies }
})

router.post('/', async ctx => {
  const test = new Dummy({ date: new Date(), i: ctx.request.body.i || -1 })
  await test.save()
  ctx.status = 201
  ctx.body = test
})

module.exports = router
