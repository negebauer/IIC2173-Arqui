const { COMMAND, COMMAND_DESCRIPTION } = require('../constants')

const helpMessage = `Puedes usar los siguientes comandos para hablar con el bot:

${Object.keys(COMMAND)
  .map(c => `/${COMMAND[c]} ${COMMAND_DESCRIPTION[c].description}`)
  .join('\n\n')}
`

const invoke = async ctx => {
  const command = ctx.command.args[0]
  if (command && COMMAND_DESCRIPTION[command]) {
    return ctx.sendMarkdown(COMMAND_DESCRIPTION[command].description)
  } else if (command) {
    return ctx.sendMarkdown(
      `El comando ${command} no tiene descripción. Prueba con ${COMMAND.help}`
    )
  }
  return ctx.sendMarkdown(helpMessage)
}

module.exports = async bot => bot.invoke(invoke)
