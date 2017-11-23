const { before } = require('./constants').STAGES
const {
  buy,
  catalog,
  categories,
  help,
  history,
  leave,
  products,
  signin,
  signup,
  start,
} = require('./constants').COMMAND

const NOT_FOUND = ctx =>
  `Comando ${ctx.command.name} *no encontrado*.
  Prueba con /${help}`

const configCommand = {
  [buy]: require('./commands/buy'),
  [catalog]: require('./commands/catalog'),
  [categories]: require('./commands/categories'),
  [help]: require('./commands/help'),
  [history]: require('./commands/history'),
  [leave]: require('./commands/leave'),
  [products]: require('./commands/products'),
  [signin]: require('./commands/signin'),
  [signup]: require('./commands/signup'),
  [start]: require('./commands/start'),
}

const markAnswered = async ctx => (ctx.done = true)

const mapCommandToConfig = bot =>
  Object.keys(configCommand).forEach(command =>
    configCommand[command](bot.command(command).use(before, markAnswered))
  )

const notFoundHandler = async c => !c.done && c.sendMarkdown(NOT_FOUND(c))

const configCommands = bot => {
  mapCommandToConfig(bot)
  bot.command(/.+/).invoke(notFoundHandler)
  return bot
}

module.exports = configCommands
