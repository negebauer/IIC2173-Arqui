const hello = ctx => ctx.sendMarkdown(`Hello ${ctx.meta.user.username}`)

const invoke = hello

const answer = hello

module.exports = async bot => bot.invoke(invoke).answer(answer)
