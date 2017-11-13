const { before } = require('./constants').STAGES
const { help, leave, products, start } = require('./constants').COMMAND

const NOT_FOUND = ctx =>
  `Comando ${ctx.command.name} *no encontrado*.
  Prueba con /${help}`

const configCommand = {
  [help]: require('./commands/help'),
  [leave]: require('./commands/leave'),
  [products]: require('./commands/products'),
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
