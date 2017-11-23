const axios = require('axios')

const selectProductsMessage = `Indica los ids de los productos que quieres obtener información.
Puedes indicar varios con espacios
Ej: 1 3 para obtener información de los productos 1 y 3
Puedes consultar *todos los productos* con
las palabra *todos* o *all*`

const credential = ctx => `telegram ${ctx.meta.user.username}`

const parseProducts = products =>
  products
    .map(({ category, id, name, price }) => {
      return `*${name}*\t$${price}\n\tid: ${id} categoría: ${category}`
    })
    .join('\n')

const getProductsInfo = async ctx => {
  let ids = ctx.command.args
  if (ctx.answer) {
    ids = ctx.answer.split(' ')
  }
  if (!ids.length > 0) {
    return ctx.sendMarkdown(selectProductsMessage)
  }
  let products
  try {
    if (ids[0] === 'all' || ids[0] === 'todos') {
      const response = await axios.get('/products', {
        headers: { Authorization: credential(ctx) },
      })
      products = response.data.products
    } else {
      const responses = await Promise.all(
        ids.map(id => axios.get(`/products/${id}`), {
          headers: { Authorization: credential(ctx) },
        })
      )
      products = responses.reduce(
        (total, response) => [...total, response.data.product],
        []
      )
    }
  } catch (err) {
    return ctx.sendMarkdown(
      `Hubo un problema obteniendo los productos ${ids}\nerror ${err}`
    )
  }
  return ctx.sendMarkdown(parseProducts(products))
}

const invoke = async ctx => getProductsInfo(ctx)

const answer = async ctx => getProductsInfo(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
