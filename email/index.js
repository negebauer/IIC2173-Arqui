/* eslint no-console:0 */
const mailNotifier = require('./src/mail/mailNotifier')
const app = require('./src/app')

const PORT = process.env.PORT || 3001
app.listen(PORT, err => {
  if (err) {
    return console.error('Failed', err)
  }
  console.log(`Listening on port ${PORT}`)
  mailNotifier.notifier.start()
})
