const axios = require('axios')

const standardMessage = `Para consultar el catálogo completo, usa la palabra *todo* o *all*
Si quieres algunas categorías, indica los ids.
Puedes indicar varios con espacios
Ej: 10 16 para obtener información de los categorías 10 y 16`

const credential = ctx => `telegram ${ctx.meta.user.username}`

const parseNestedCategories = categories =>
  categories
    .map(category => {
      const { id, context, area, group } = category
      const msg = `*id: ${id}*\ncontexto: ${context}\nárea: ${area}\ngrupo: ${
        group
      }\nproductos:\n\t\t\t\t${
        !category.products.length
          ? 'No tiene productos'
          : 'id |       nombre       | precio\n\t\t\t' +
            category.products
              .map(
                p =>
                  `${p.id} ${p.name} ${' '.repeat(22 - p.name.length)} $${
                    p.price
                  }`
              )
              .join('\n\t\t\t')
      }`
      return msg
    })
    .join('\n')

const getNestedCategoriesInfo = async ctx => {
  let ids = ctx.command.args
  if (ctx.answer) {
    ids = ctx.answer.split(' ')
  }
  if (!ids.length > 0) {
    return ctx.sendMarkdown(standardMessage)
  }
  let categories
  try {
    if (ids[0] === 'all' || ids[0] === 'todo') {
      const response = await axios.get('/categories/products', {
        headers: { Authorization: credential(ctx) },
      })
      categories = response.data.categories
    } else {
      const responses = await Promise.all(
        ids.map(id =>
          axios.get(`/categories/${id}/products`, {
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
  return ctx.sendMarkdown(parseNestedCategories(categories))
}

const invoke = async ctx => getNestedCategoriesInfo(ctx)

const answer = async ctx => getNestedCategoriesInfo(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
