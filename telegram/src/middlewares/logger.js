/* eslint no-console:0 */

module.exports = async ctx => {
  const { username } = ctx.meta.user
  const { name, args, type } = ctx.command
  const { title, id } = ctx.meta.chat
  const answer = ctx.answer
  return console.log(
    `${type} from @${username} /${name}, args: ${
      args.length > 0 ? args : '[]'
    }, answer: ${answer}, chat: ${title} id: ${id}`
  )
}
