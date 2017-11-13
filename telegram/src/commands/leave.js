const axios = require('axios')
const { TOKEN } = require('../constants').ENV

const leave = async ctx => {
  const { id, title } = ctx.meta.chat
  if (!title) {
    return ctx.sendMarkdown('No me puedo salir de un chat no grupal')
  }
  await ctx.sendMarkdown('¡Adios!')
  const url = `https://api.telegram.org/bot${TOKEN}/leaveChat`
  return axios.post(url, { chat_id: id })
}

const invoke = leave

module.exports = async bot => bot.invoke(invoke)
