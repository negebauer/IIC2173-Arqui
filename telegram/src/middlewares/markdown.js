const { DEV } = require('../constants').ENV

module.exports = async ctx => {
  ctx.sendMarkdown = (message, options) => {
    const config = { ...options, parse_mode: 'Markdown' }
    if (DEV) {
      return ctx.sendMessage(`*DEV*\n${message}`, config)
    }
    return ctx.sendMessage(message, config)
  }
}
