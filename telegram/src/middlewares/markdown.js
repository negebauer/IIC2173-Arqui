module.exports = async ctx => {
  ctx.sendMarkdown = (message, options) => {
    return ctx.sendMessage(message, { ...options, parse_mode: 'Markdown' })
  }
}
