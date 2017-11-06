const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const notifier = require('./mail/notifier')
const router = require('./routes')

const app = new Koa()

notifier.start()
app.use(logger('dev'))
app.use(bodyParser())
app.use(router.routes())

module.exports = app
