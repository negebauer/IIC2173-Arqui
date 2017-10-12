const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const router = require('./routes')
const mongo = require('./db')

const app = new Koa()
app.context.db = mongo.start()
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser())
app.use(router.routes())

module.exports = app
