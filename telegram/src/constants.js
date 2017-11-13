const COMMAND = {
  start: 'start',
  hello: 'hello',
  help: 'help',
  products: 'products',
  bye: 'bye',
}

const COMMAND_DESCRIPTION = {
  [COMMAND.start]: 'Inicia el bot',
  [COMMAND.hello]: 'Dile hola para que te pregunte tu nombre',
  [COMMAND.help]: `Muestra el mensaje de ayuda.
  Puedes pedir ayuda de un comando específico
  usando /${COMMAND.help} comando`,
  [COMMAND.products]: `Muestra información de los productos.
  Puedes consultar productos específicos indicando su id.
  Ej: /${COMMAND.products} 1 3 para ver los productos 1 y 3`,
  [COMMAND.bye]: 'Dile adiós y se despedirá de ti',
}

module.exports = {
  ENV: {
    API_URI: process.env.API_URI || 'http://localhost:3000',
    TOKEN: process.env.TOKEN || '485892696:AAHOHg3Sk2CNUt_ArGuv09qxGv9eqJuiY78',
    SECRET: process.env.API_TELEGRAM_SECRET || 'apitelegramsecret',
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
