const invoke = async ctx => ctx.sendMessage(`Hello ${ctx.meta.user.username}`)

const answer = async () => {}

module.exports = async bot => bot.invoke(invoke).answer(answer)
