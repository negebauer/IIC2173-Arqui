const NODE_ENV = process.env.NODE_ENV || 'development'
const DEV = NODE_ENV === 'development'

/**
 *  Define all telegram commands' keys
 */
const COMMAND = {
  start: 'start',
  leave: 'leave',
  help: 'help',
  catalog: 'catalog',
  products: 'products',
  categories: 'categories',
  signin: 'signin',
  signup: 'signup',
  buy: 'buy',
  history: 'history',
}

/**
 *  The description of the commands
 *  @param  summary message show on / write on chat
 *  @param  description message show on /help
 */
const COMMAND_DESCRIPTION = {
  [COMMAND.buy]: {
    summary: 'Comprar productos',
    description: `
      Compre productos indicando su id.
      Ej: /${COMMAND.buy} 10 16, para comprar los productos 10 y 16`,
  },
  [COMMAND.catalog]: {
    summary: 'Muestra categorías con productos',
    description: `
      Muestra información de las categorías con sus productos.
      Consulte categorías específicas indicando su id.
      Ej: /${COMMAND.categories} 8 19, para ver las categorías 10 y 16`,
  },
  [COMMAND.categories]: {
    summary: 'Muestra categorías',
    description: `
      Muestra información de las categorías.
      Consulte categorías específicas indicando su id.
      Ej: /${COMMAND.categories} 10 16, para ver las categorías 10 y 16`,
  },
  [COMMAND.help]: {
    summary: 'Cómo usar el bot',
    description: `
      Muestra el mensaje de ayuda.
      Solicite ayuda de un comando específico usando /${COMMAND.help} comando`,
  },
  [COMMAND.history]: {
    summary: 'Historial de compras',
    description: `
      Consulte su historial de compras de esta vía.
      Fecha decreciente: sin argumentos o 0.
      Fecha creciente: 1.
      Ej: /${COMMAND.history} 0`,
  },
  [COMMAND.leave]: {
    summary: 'Bot deja el chat',
    description: 'Bot deja el chat',
  },
  [COMMAND.products]: {
    summary: 'Muestra productos',
    description: `
      Muestra información de los productos.
      Consulte productos específicos indicando su id.
      Ej: /${COMMAND.products} 1 3, para ver los productos 1 y 3`,
  },
  [COMMAND.signin]: {
    summary: 'Asigna un usuario',
    description: `
      Asigna un usuario.
      Indique su email y contraseña.
      Ej: /${COMMAND.signin} jperez@uc.cl 123456`,
  },
  [COMMAND.signup]: {
    summary: 'Crea un usuario',
    description: `
      Crea un usuario.
      Indique su nombre, apellido, email, dirección y contraseña.
      Para espacios en blanco use guiones.
      Ej: /${COMMAND.signup} José Pérez jperez@uc.cl Calle-1234,-Comuna 123456`,
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
