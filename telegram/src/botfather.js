/* eslint no-console:0 */

const { COMMAND, COMMAND_DESCRIPTION } = require('./constants')

Object.keys(COMMAND).forEach(c =>
  console.log(`${COMMAND[c]} - ${COMMAND_DESCRIPTION[c].summary}`)
)
