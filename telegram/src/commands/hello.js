const invoke = async ctx => {
  if (ctx.meta.user.username === 'fnmendez') {
    return ctx.sendMessage('franco qlo')
  }
  return ctx.sendMessage('Hello! What is your name?')
}

const answer = async ctx => {
  // Sets user answer to session.name.
  ctx.session.name = ctx.answer
  return ctx.sendMessage('OK! I got it.')
}

module.exports = async bot => bot.invoke(invoke).answer(answer)
