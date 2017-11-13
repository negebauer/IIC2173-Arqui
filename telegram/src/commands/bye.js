const invoke = async ctx => {
  return ctx.sendMessage('Bye ' + ctx.session.name)
}

const answer = async () => {}

module.exports = async bot => bot.invoke(invoke).answer(answer)
