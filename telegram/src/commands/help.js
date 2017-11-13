const { COMMAND, COMMAND_DESCRIPTION } = require('../constants')

const helpMessage = `Puedes usar los siguientes comandos para hablar con el bot:

${Object.keys(COMMAND_DESCRIPTION)
  .map(command => `/${COMMAND[command]} ${COMMAND_DESCRIPTION[command]}`)
  .join('\n\n')}
`

const invoke = async ctx => {
  const command = ctx.command.args[0]
  if (command && COMMAND_DESCRIPTION[command]) {
    return ctx.sendMessage(COMMAND_DESCRIPTION[command])
  } else if (command) {
    return ctx.sendMessage(
      `El comando ${command} no tiene descripción. Prueba con ${COMMAND.help}`
    )
  }
  return ctx.sendMessage(helpMessage)
}

module.exports = async bot => bot.invoke(invoke)
