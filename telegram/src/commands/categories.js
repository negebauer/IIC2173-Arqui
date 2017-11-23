const axios = require('axios')

const standardMessage = `Indica los ids de las categorías que quieres obtener información.
Puedes indicar varios con espacios
Ej: 10 16 para obtener información de los categorías 10 y 16
Puedes consultar *todas los categorías* con
las palabra *todas* o *all*`

const credential = ctx => `telegram ${ctx.meta.user.username}`

const parseCategories = categories =>
  categories
    .map(({ id, context, area, group }) => {
      return `*id: ${id}*\n\t*contexto: ${context}*\n\tárea: ${
        area
      }\n\tgrupo: ${group}`
    })
    .join('\n')

const getCategoriesInfo = async ctx => {
  let ids = ctx.command.args
  if (ctx.answer) {
    ids = ctx.answer.split(' ')
  }
  if (!ids.length > 0) {
    return ctx.sendMarkdown(standardMessage)
  }
  let categories
  try {
    if (ids[0] === 'all' || ids[0] === 'todas') {
      const response = await axios.get('/categories', {
        headers: { Authorization: credential(ctx) },
      })
      categories = response.data.categories
    } else {
      const responses = await Promise.all(
        ids.map(id =>
          axios.get(`/categories/${id}`, {
            headers: { Authorization: credential(ctx) },
          })
        )
      )
      categories = responses.reduce(
        (total, response) => [...total, response.data.category],
        []
      )
    }
  } catch (err) {
    return ctx.sendMarkdown(
      `Hubo un problema obteniendo las categorías ${ids}\nerror ${err}`
    )
  }
  return ctx.sendMarkdown(parseCategories(categories))
}

const invoke = async ctx => getCategoriesInfo(ctx)

const answer = async ctx => getCategoriesInfo(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
