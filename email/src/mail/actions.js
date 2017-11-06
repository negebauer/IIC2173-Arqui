const apiRequests = require('../helpers/apiRequests')
const sendMail = require('./sender')
const {
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_CATEGORY_WITH_PRODUCTS,
  GET_ORDER_SENT,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
  GET_HELP,
  ORDER_RESPONSE_STATUS,
  ORDER_RESPONSE_SUCCESS,
  STATUS_CODE_404,
  STATUS_CODE_503,
} = require('./templates')

const parseMail = userInfo => userInfo.match(/<(.*?)>/)[1]

const getCategories = async userInfo => {
  let categoriesData, mailSubject, mailMessage
  const categories = await apiRequests.getCategories(parseMail(userInfo))
  if (categories.status === 200) {
    categoriesData = categories.data.categories
    mailSubject = GET_CATEGORIES.subject
    mailMessage = GET_CATEGORIES.message(categoriesData)
  } else {
    mailSubject = STATUS_CODE_503.subject
    mailMessage = STATUS_CODE_503.message
  }
  sendMail(userInfo, mailMessage, mailSubject)
}

const getCategory = async (userInfo, categoryId) => {
  let categoryData, mailSubject, mailMessage
  try {
    const category = await apiRequests.getCategories(
      parseMail(userInfo),
      categoryId
    )
    if (category.status === 200) {
      categoryData = category.data.category
      mailSubject = GET_CATEGORY.subject(categoryData)
      mailMessage = GET_CATEGORY.message(categoryData)
    } else if (category.status === 503) {
      mailSubject = STATUS_CODE_503.subject
      mailMessage = STATUS_CODE_503.message
    } else throw new Error()
  } catch (error) {
    mailSubject = STATUS_CODE_404.subject
    mailMessage = STATUS_CODE_404.message('categoría', categoryId)
  }
  sendMail(userInfo, mailMessage, mailSubject)
}

const getHelp = async userInfo => {
  const mailMessage = GET_HELP.message
  const mailSubject = GET_HELP.subject
  sendMail(userInfo, mailMessage, mailSubject)
}

const getNestedCategory = async (userInfo, categoriesIds) => {
  const categoriesData = []
  const failIds = []
  for (const categoryId of categoriesIds) {
    try {
      const category = await apiRequests.getNestedCategory(
        parseMail(userInfo),
        categoryId
      )
      if (category.status !== 200) throw new Error()
      categoriesData.push(category.data.category)
    } catch (error) {
      failIds.push(categoryId)
    }
  }
  const mailSubject = GET_CATEGORY_WITH_PRODUCTS.subject
  const mailMessage = GET_CATEGORY_WITH_PRODUCTS.message(
    categoriesData,
    failIds
  )
  sendMail(userInfo, mailMessage, mailSubject)
}

const getProduct = async (userInfo, productsIds) => {
  const productsData = []
  const failIds = []
  for (const productId of productsIds) {
    try {
      const product = await apiRequests.getProducts(
        parseMail(userInfo),
        productId
      )
      if (product.status !== 200) throw new Error()
      productsData.push(product.data.product)
    } catch (error) {
      failIds.push(productId)
    }
  }
  const mailSubject = GET_PRODUCT.subject
  const mailMessage = GET_PRODUCT.message(productsData, failIds)
  sendMail(userInfo, mailMessage, mailSubject)
}

const getProducts = async userInfo => {
  let productsData, mailSubject, mailMessage
  const products = await apiRequests.getProducts(parseMail(userInfo))
  if (products.status === 200) {
    productsData = products.data.products
    mailSubject = GET_PRODUCTS.subject
    mailMessage = GET_PRODUCTS.message(productsData)
  } else {
    mailSubject = STATUS_CODE_503.subject
    mailMessage = STATUS_CODE_503.message
  }
  sendMail(userInfo, mailMessage, mailSubject)
}

const getProductsByCategory = async userInfo => {
  let productsByCategoryData, mailSubject, mailMessage
  const productsByCategory = await apiRequests.getProductsByCategory(
    parseMail(userInfo)
  )

  if (productsByCategory.status === 200) {
    productsByCategoryData = productsByCategory.data.categories
    mailSubject = GET_PRODUCTS_BY_CATEGORY.subject
    mailMessage = GET_PRODUCTS_BY_CATEGORY.message(productsByCategoryData)
  } else {
    mailSubject = STATUS_CODE_503.subject
    mailMessage = STATUS_CODE_503.message
  }
  sendMail(userInfo, mailMessage, mailSubject)
}

const orderResponse = async ({
  user,
  resolved,
  products,
  errors,
  confirmationUrl,
}) => {
  let mailSubject, mailMessage
  if (resolved) {
    mailSubject = ORDER_RESPONSE_SUCCESS.subject
    mailMessage = ORDER_RESPONSE_SUCCESS.message(resolved)
  } else if (errors) {
    mailSubject = ORDER_RESPONSE_STATUS.subject
    mailMessage = ORDER_RESPONSE_STATUS.message(
      products,
      errors,
      confirmationUrl
    )
  } else {
    const error = new Error()
    error.message = "Coulnd't recognize input to order status endpoint"
    throw error
  }
  sendMail(user, mailMessage, mailSubject)
}

const sendOrder = async (userInfo, productsIds) => {
  let mailSubject, mailMessage
  const order = await apiRequests.sendOrder(parseMail(userInfo), productsIds)
  if (order.status === 200) {
    mailSubject = GET_ORDER_SENT.subject
    mailMessage = GET_ORDER_SENT.message
  } else {
    mailSubject = STATUS_CODE_503.subject
    mailMessage = STATUS_CODE_503.message
  }
  sendMail(userInfo, mailMessage, mailSubject)
}

module.exports = {
  getCategories,
  getCategory,
  getHelp,
  getNestedCategory,
  getProducts,
  getProduct,
  getProductsByCategory,
  orderResponse,
  sendOrder,
}
