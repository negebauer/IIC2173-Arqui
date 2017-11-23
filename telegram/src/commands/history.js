const axios = require('axios')
const parseDate = require('../helpers/parseDate')

const credential = ctx => `telegram ${ctx.meta.user.username}`

const parseOrders = orders => {
  const parsedOrders = parseDate(orders, 'sentAt')
  return parsedOrders
    .map(
      ({ completed, productId, productName, sentAt }) =>
        `*${productName}*
        id: ${productId}
        completa: ${completed}
        _${sentAt}_`
    )
    .join('\n')
}

const getOrders = async ctx => {
  let ids = ctx.command.args
  if (ctx.answer) {
    ids = ctx.answer.split(' ')
  }
  let orders
  try {
    const response = await axios.get(
      `/orders?sort=${ids[0] && Number(ids[0]) === 1 ? 'asc' : 'desc'}`,
      {
        headers: { Authorization: credential(ctx) },
      }
    )
    orders = response.data.orders
  } catch (err) {
    return ctx.sendMarkdown(
      `Hubo un problema en la solicitud del historial\nerror ${err}`
    )
  }
  if (!orders || !orders.length)
    return ctx.sendMarkdown('Aún no tienes órdenes procesadas.')
  return ctx.sendMarkdown(parseOrders(orders))
}

const invoke = async ctx => getOrders(ctx)

const answer = async ctx => getOrders(ctx)

module.exports = async bot => bot.invoke(invoke).answer(answer)
