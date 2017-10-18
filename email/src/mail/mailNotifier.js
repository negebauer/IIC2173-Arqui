const notifier = require('mail-notifier')
const actions = require('./actions')

const splitItems = mail => {
  const aux = mail.text.split(':')
  const aux2 = aux[1].split('.')
  const items = aux2[0].split(';').map(i => i.trim())
  return items
}

const imap = {
  username: 'IIC2173grupo1@gmail.com',
  password: 'arquitectura',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
}

module.exports = {
  notifier: notifier(imap).on('mail', function(mail) {
    try {
      if (mail.subject == 'Catalogo') {
        actions.getProducts(mail.headers.from)
      } else if (mail.subject == 'Categorias') {
        actions.getCategories(mail.headers.from)
      } else if (mail.subject == 'Categoria') {
        const categoryId = splitItems(mail)[0]
        actions.getCategory(mail.headers.from, categoryId)
      } else if (mail.subject == 'Productos por categoria') {
        const categoriesIds = splitItems(mail)
        actions.getOneCategoryWithNestedProducts(
          mail.headers.from,
          categoriesIds
        )
      } else if (mail.subject == 'Consulta') {
        const itemIDs = splitItems(mail)
        actions.getProduct(mail.headers.from, itemIDs)
      } else if (mail.subject == 'Compra') {
        const itemIDs = splitItems(mail)
        actions.sendOrder(mail.headers.from, itemIDs)
      } else if (mail.subject == 'Catalogo por categoria') {
        actions.getProductsBycategory(mail.headers.from)
      } else {
        actions.help(mail.headers.from)
      }
    } catch (e) {
      actions.help(mail.headers.from)
    }
  }),
}
