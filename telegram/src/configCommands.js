const { STAGES, COMMAND } = require('./constants')
const bye = require('./commands/bye')
const hello = require('./commands/hello')
const help = require('./commands/help')
const products = require('./commands/products')
const start = require('./commands/start')

const NOT_FOUND = `Comando no encontrado. Prueba con /${COMMAND.help}`

const commandHandler = {
  [COMMAND.start]: start,
  [COMMAND.hello]: hello,
  [COMMAND.help]: help,
  [COMMAND.products]: products,
  [COMMAND.bye]: bye,
}

const mapCommandToHandler = bot =>
  Object.keys(commandHandler).forEach(command =>
    commandHandler[command](
      bot
        .command(command)
        .use(STAGES.before, async ctx => (ctx.foundCommand = true))
    )
  )

const configNotFound = bot =>
  bot
    .command(/.+/)
    .invoke(async ctx => !ctx.foundCommand && ctx.sendMessage(NOT_FOUND))

const configCommands = bot => {
  mapCommandToHandler(bot)
  configNotFound(bot)
  return bot
}

module.exports = configCommands
