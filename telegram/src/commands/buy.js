const axios = require('axios')

const standardMessage = `Para consultar el catálogo completo, usa la palabra *todo* o *all*
Si quieres algunas categorías, indica los ids.
Puedes indicar varios con espacios
Ej: 10 16 para obtener información de los categorías 10 y 16`

const credential = ctx => `telegram ${ctx.meta.user.username}`

const buyProducts = async ctx => {
  let productsIds = ctx.command.args
  if (ctx.answer) {
    productsIds = ctx.answer.split(' ')
  }
  if (!productsIds.length > 0) {
    return ctx.sendMarkdown(standardMessage)
  }
  productsIds = productsIds.map(id => Number(id))
  try {
    await axios.post(
      `/orders`,
      { productsIds },
      {
        headers: { Authorization: credential(ctx) },
      }
    )
  } catch (err) {
    return ctx.sendMarkdown(
      `Hubo un problema ingresando la compra\nerror ${err}`
    )
  }
  return ctx.sendMarkdown(
    `La compra fue ingresada con éxito. Para más información revise su email.`
  )
}

const invoke = async ctx => buyProducts(ctx)

const answer = async ctx => buyProducts(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
