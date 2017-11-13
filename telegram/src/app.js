/* eslint no-console:0 */

const BotBrother = require('bot-brother')
const axios = require('axios')
const { ENV, STAGES } = require('./constants')
const logger = require('./middlewares/logger')
const markdown = require('./middlewares/markdown')
const bot = require('./bot')
const configCommands = require('./configCommands')

axios.defaults.baseURL = ENV.API_URI
axios.defaults.headers.common['Secret'] = ENV.SECRET

bot.use(STAGES.before, logger)
bot.use(STAGES.before, markdown)
bot.use(STAGES.before, BotBrother.middlewares.typing())

configCommands(bot)
