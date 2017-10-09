const Koa = require("koa")
const logger = require("koa-logger")
const bodyParser = require("koa-bodyparser")
const router = require("./routes")
const mongo = require("./db")

var cors = require("koa-cors")

const app = new Koa()
app.context.db = mongo.start()
app.use(logger("dev"))
app.use(bodyParser())

app.use(cors())
app.use(router.routes())

module.exports = app
