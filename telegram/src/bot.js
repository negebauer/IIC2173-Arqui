const BotBrother = require('bot-brother')
const { ENV } = require('./constants')

const TOKEN = ENV.TOKEN

const bot = BotBrother({
  key: TOKEN,
  sessionManager: BotBrother.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 },
})

module.exports = bot
