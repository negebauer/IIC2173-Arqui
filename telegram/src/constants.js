const NODE_ENV = process.env.NODE_ENV || 'development'
const DEV = NODE_ENV === 'development'

/**
 *  Define all telegram commands' keys
 */
const COMMAND = {
  help: 'help',
  leave: 'leave',
  products: 'products',
  start: 'start',
}

/**
 *  The description of the commands
 *  @param  summary message show on / write on chat
 *  @param  description message show on /help
 */
const COMMAND_DESCRIPTION = {
  [COMMAND.help]: {
    summary: 'Como usar el bot',
    description: `Muestra el mensaje de ayuda.
    Puedes pedir ayuda de un comando específico
    usando /${COMMAND.help} comando`,
  },
  [COMMAND.leave]: {
    summary: 'Bot sale del chat',
    description: 'Bot sale del chat',
  },
  [COMMAND.products]: {
    summary: 'Muestra productos',
    description: `Muestra información de los productos.
    Puedes consultar productos específicos indicando su id.
    Ej: /${COMMAND.products} 1 3 para ver los productos 1 y 3`,
  },
  [COMMAND.start]: {
    summary: 'Inicia el bot',
    description: 'Inicia el bot',
  },
}

module.exports = {
  ENV: {
    API_URI: process.env.API_URI || 'http://localhost:3000',
    TOKEN: process.env.TOKEN || '485892696:AAHOHg3Sk2CNUt_ArGuv09qxGv9eqJuiY78',
    SECRET: process.env.API_TELEGRAM_SECRET || 'apitelegramsecret',
    NODE_ENV,
    DEV,
  },
  COMMAND,
  COMMAND_DESCRIPTION,
  STAGES: {
    before: 'before', // applied before all stages
    beforeInvoke: 'beforeInvoke', // applied before invoke stage
    beforeAnswer: 'beforeAnswer', // applied before answer stage
    invoke: 'invoke', // same as command.invoke(...)
    answer: 'answer', // same as command.answer(...)}
  },
}
