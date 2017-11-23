const axios = require('axios')

const standardMessage = `Indique su nombre, apellido, email, dirección
y contraseña.
Para espacios en blanco use guiones.
Ej: José Pérez jperez@uc.cl Calle-1234,-Comuna 123456`

const signUp = async ctx => {
  let attrs = ctx.command.args
  if (ctx.answer) {
    attrs = ctx.answer.split(' ')
  }
  if (!attrs.length > 0) {
    return ctx.sendMarkdown(standardMessage)
  }
  const [firstName, lastName, mail, address] = attrs.map(i =>
    i.replace(/-/g, ' ')
  )
  const params = {
    firstName,
    lastName,
    mail,
    address,
    password: attrs[attrs.length - 1],
    telegram: ctx.meta.user.username,
  }
  try {
    await axios.post('/signup', params)
  } catch (err) {
    return ctx.sendMarkdown(
      `Hubo un problema creando el usuario, puede que
      - Alguno de los parámetros tenga errores o
      - El email o tu telegram ya estén en uso`
    )
  }
  return ctx.sendMarkdown(
    'El usuario se ha creado con éxito, ¡y ya estás ingresado!'
  )
}

const invoke = async ctx => signUp(ctx)

const answer = async ctx => signUp(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
