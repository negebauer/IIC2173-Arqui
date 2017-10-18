const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
//const mailNotifier = require('./mail/mailNotifier')

const app = new Koa()
app.use(logger('dev'))
app.use(bodyParser())

app.use(async (ctx, next) => {
  return next()
})

app.use(router.routes())

module.exports = app
