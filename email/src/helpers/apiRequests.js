const axios = require('axios')
const { API_URI, API_MAILER_SECRET } = require('../constants')

const getCategories = (mail, id) => {
  return axios.get(`${API_URI}/categories${id ? `/${id}` : ''}`, {
    headers: {
      Authorization: `mail ${mail}`,
      'Content-Type': 'application/json',
      Secret: API_MAILER_SECRET,
    },
  })
}

const getNestedCategory = (mail, categoryId) => {
  return axios.get(`${API_URI}/categories/${categoryId}/products`, {
    headers: {
      Authorization: `mail ${mail}`,
      'Content-Type': 'application/json',
      Secret: API_MAILER_SECRET,
    },
  })
}

const getProducts = (mail, item) => {
  return axios.get(`${API_URI}/products${item ? `/${item}` : ''}`, {
    headers: {
      Authorization: `mail ${mail}`,
      Secret: API_MAILER_SECRET,
      'Content-Type': 'application/json',
    },
  })
}

const getProductsByCategory = mail => {
  return axios.get(`${API_URI}/categories/products`, {
    headers: {
      Authorization: `mail ${mail}`,
      'Content-Type': 'application/json',
      Secret: API_MAILER_SECRET,
    },
  })
}

const sendOrder = async (mail, items) => {
  return axios.post(
    `${API_URI}/orders`,
    { productsIds: items },
    {
      headers: {
        Authorization: `mail ${mail}`,
        Secret: API_MAILER_SECRET,
        'Content-Type': 'application/json',
      },
    }
  )
}

module.exports = {
  getCategories,
  getNestedCategory,
  getProducts,
  getProductsByCategory,
  sendOrder,
}
