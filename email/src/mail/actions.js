const apiRequests = require('./apiRequests')
const mailResponse = require('./mailResponse')
const constants = require('./constants')

const mailParser = mail =>
  mail.substring(mail.indexOf('<') + 1, mail.indexOf('>'))

const getCategories = async mailReceiver => {
  let categoriesData, mailSubject, mailMessage
  const categories = await apiRequests.getCategories(mailParser(mailReceiver))
  if (categories.status == 200) {
    categoriesData = categories.data.categories
    mailSubject = constants.GET_CATEGORIES.subject
    mailMessage = constants.GET_CATEGORIES.message(categoriesData)
  } else {
    mailSubject = constants.STATUS_CODE_503.subject
    mailMessage = constants.STATUS_CODE_503.message
  }
  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}

const getCategory = async (mailReceiver, categoryId) => {
  let categoryData, mailSubject, mailMessage
  try {
    const category = await apiRequests.getCategory(
      mailParser(mailReceiver),
      categoryId
    )
    if (category.status == 200) {
      categoryData = category.data.category
      mailSubject = constants.GET_CATEGORY.subject(categoryData)
      mailMessage = constants.GET_CATEGORY.message(categoryData)
    } else {
      mailSubject = constants.STATUS_CODE_503.subject
      mailMessage = constants.STATUS_CODE_503.message
    }
  } catch (e) {
    mailSubject = constants.STATUS_CODE_503.subject
    mailMessage = constants.STATUS_CODE_503.message
  }
  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}

const getOneCategoryWithNestedProducts = async (
  mailReceiver,
  categoriesIds
) => {
  let mailSubject, mailMessage
  const categoriesData = []
  const failIDs = []
  for (const categoryId of categoriesIds) {
    const category = await apiRequests.getOneCategoryWithNestedProducts(
      mailParser(mailReceiver),
      categoryId
    )
    if (category.status == 200) {
      categoriesData.push(category.data.category)
    } else {
      failIDs.push(categoryId)
    }
    mailSubject = constants.GET_CATEGORY_WITH_PRODUCTS.subject
    mailMessage = constants.GET_CATEGORY_WITH_PRODUCTS.message(
      categoriesData,
      failIDs
    )
    mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
  }
}

const getProducts = async mailReceiver => {
  let productsData, mailSubject, mailMessage
  const products = await apiRequests.getProducts(mailParser(mailReceiver))

  if (products.status == 200) {
    productsData = products.data.products
    mailSubject = constants.GET_PRODUCTS.subject
    mailMessage = constants.GET_PRODUCTS.message(productsData)
  } else {
    mailSubject = constants.STATUS_CODE_503.subject
    mailMessage = constants.STATUS_CODE_503.message
  }
  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}

const getProduct = async (mailReceiver, itemsIDs) => {
  const productsData = []
  const failIDs = []
  for (const itemID of itemsIDs) {
    const product = await apiRequests.getProduct(
      itemID,
      mailParser(mailReceiver)
    )
    if (product.status == 200) {
      productsData.push(product.data.product)
    } else {
      failIDs.push(itemID)
    }
    const mailSubject = constants.GET_PRODUCT.subject
    const mailMessage = constants.GET_PRODUCT.message(productsData, failIDs)
    mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
  }
}

const sendOrder = async (mailReceiver, items) => {
  let mailSubject, mailMessage
  const order = await apiRequests.sendOrder(mailParser(mailReceiver), items)
  if (order.status == 200) {
    mailSubject = constants.GET_ORDER_SENT.subject
    mailMessage = constants.GET_ORDER_SENT.message
  } else {
    mailSubject = constants.STATUS_CODE_503.subject
    mailMessage = constants.STATUS_CODE_503.message
  }
  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}

const getProductsBycategory = async mailReceiver => {
  let productsBycategoryData, mailSubject, mailMessage
  const productsBycategory = await apiRequests.getProductsBycategory(
    mailParser(mailReceiver)
  )

  if (productsBycategory.status == 200) {
    productsBycategoryData = productsBycategory.data.categories
    mailSubject = constants.GET_PRODUCTS_BY_CATEGORY.subject
    mailMessage = constants.GET_PRODUCTS_BY_CATEGORY.message(
      productsBycategoryData
    )
  } else {
    mailSubject = constants.STATUS_CODE_503.subject
    mailMessage = constants.STATUS_CODE_503.message
  }
  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}

const orderResponse = async ctx => {
  const request = ctx.request
  let mailSubject, mailMessage
  const mailReceiver = request.body.user || 'IIC2173grupo1@gmail.com'
  if (request.body.resolved) {
    const resolved = request.body.resolved
    mailSubject = constants.ORDER_RESPONSE_SUCCESS.subject
    mailMessage = constants.ORDER_RESPONSE_SUCCESS.message(resolved)
  } else if (request.body.errors) {
    const errors = request.body.errors
    mailSubject = constants.ORDER_RESPONSE_FAILURE.subject
    mailMessage = constants.ORDER_RESPONSE_FAILURE.message(errors)
  } else {
    mailSubject = ''
    mailMessage = ''
  }

  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}
const help = async mailReceiver => {
  const mailMessage = constants.NO_SUBJECT.message
  const mailSubject = constants.NO_SUBJECT.subject
  mailResponse.processMail(mailReceiver, mailMessage, mailSubject)
}

module.exports = {
  getOneCategoryWithNestedProducts,
  getCategories,
  getProducts,
  getProduct,
  getCategory,
  sendOrder,
  getProductsBycategory,
  orderResponse,
  help,
}
