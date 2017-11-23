const axios = require('axios')

const standardMessage = `Indique su email y contraseña.
Ej: jperez@uc.cl 123456`

const signIn = async ctx => {
  let attrs = ctx.command.args
  if (ctx.answer) {
    attrs = ctx.answer.split(' ')
  }
  if (!attrs.length > 0) {
    return ctx.sendMarkdown(standardMessage)
  }
  const [mail, password] = attrs
  const params = {
    mail,
    password,
    telegram: ctx.meta.user.username,
  }
  try {
    await axios.post('/telegram', params)
  } catch (err) {
    return ctx.sendMarkdown(
      `Hubo un problema asignando el usuario,
      - Asegúrese de haber escrito correctamente sus datos`
    )
  }
  return ctx.sendMarkdown(
    'El usuario se ha asignado con éxito, ¡y ya estás ingresado!'
  )
}

const invoke = async ctx => signIn(ctx)

const answer = async ctx => signIn(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
