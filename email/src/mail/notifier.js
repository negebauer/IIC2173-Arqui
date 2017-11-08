const notifier = require('mail-notifier')
const { MAIL_USER, MAIL_PASSWORD } = require('../constants')
const {
  getCategories,
  getCategory,
  getHelp,
  getNestedCategory,
  getOrders,
  getProduct,
  getProducts,
  getProductsByCategory,
  sendOrder,
} = require('./actions')

const imap = {
  username: MAIL_USER,
  password: MAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
}

module.exports = notifier(imap).on('mail', mail => {
  const user = mail.headers.from
  const ids = mail.text.match(/[0-9]+?/)
    ? mail.text
        .match(/([0-9;]+)/)[1]
        .split(';')
        .map(id => Number(id))
    : [0]

  switch (mail.subject) {
    case 'Catalogo':
      getProducts(user)
      break
    case 'Catalogo por categoria':
      getProductsByCategory(user)
      break
    case 'Categoria':
      getCategory(user, ids[0])
      break
    case 'Categorias':
      getCategories(user)
      break
    case 'Compra':
      sendOrder(user, ids)
      break
    case 'Historial':
      getOrders(user, ids[0])
      break
    case 'Productos':
      getProduct(user, ids)
      break
    case 'Productos por categoria':
      getNestedCategory(user, ids)
      break
    default:
      getHelp(user)
  }
})
