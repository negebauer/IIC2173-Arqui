/* eslint no-console:0 */

const { COMMAND_DESCRIPTION } = require('./constants')

Object.keys(COMMAND_DESCRIPTION).forEach(command => {
  const message = COMMAND_DESCRIPTION[command].split('\n').join(' ')
  console.log(`${command} - ${message}`)
})
