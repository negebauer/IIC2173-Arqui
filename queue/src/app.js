const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const queue = require('./queue')

const app = new Koa()
app.context.queue = queue
app.use(logger('dev'))
app.use(bodyParser())

app.use(router.routes())

module.exports = app
