const axios = require('axios')
const constants = require('./constants')

const API = process.env.API || 'localhost:3000'
const token = constants.SECRET.TOKEN

const getCategories = mail => {
  return axios({
    method: 'GET',
    url: `${API}/categories`,
    headers: {
      Authorization: `mail ${mail}`,
      'Content-type': 'application/json',
      Secret: token,
    },
  })
}

const getCategory = (mail, categoryId) => {
  return axios({
    method: 'GET',
    url: `${API}/categories/${categoryId}`,
    headers: {
      Authorization: `mail ${mail}`,
      'Content-type': 'application/json',
      Secret: token,
    },
  })
}
const getOneCategoryWithNestedProducts = (mail, categoryId) => {
  return axios({
    method: 'GET',
    url: `${API}/categories/${categoryId}/products`,
    headers: {
      Authorization: `mail ${mail}`,
      'Content-type': 'application/json',
      Secret: token,
    },
  })
}

const getProducts = mail => {
  return axios({
    method: 'GET',
    url: `${API}/products`,
    headers: {
      Authorization: `mail ${mail}`,
      'Content-type': 'application/json',
      Secret: token,
    },
  })
}

const getProduct = (item, mail) => {
  return axios({
    method: 'GET',
    url: `${API}/products/${item}`,
    headers: {
      Authorization: `mail ${mail}`,
      Secret: token,
      'Content-type': 'application/json',
    },
  })
}
const sendOrder = async (mail, items) => {
  return axios({
    method: 'POST',
    url: `${API}/orders`,
    headers: {
      Authorization: `mail ${mail}`,
      Secret: token,
      'Content-type': 'application/json',
    },
    data: {
      productsIds: items,
    },
  })
}

const getProductsBycategory = mail => {
  return axios({
    method: 'GET',
    url: `${API}/categories/products`,
    headers: {
      Authorization: `mail ${mail}`,
      'Content-type': 'application/json',
      Secret: token,
    },
  })
}

module.exports = {
  getOneCategoryWithNestedProducts,
  getCategories,
  getProducts,
  getProduct,
  getCategory,
  sendOrder,
  getProductsBycategory,
}
