const Category = require('../models/category')
const Product = require('../models/product')
const { SETTING_CACHE_TIMEOUT } = require('../constants')

const setCategoriesCache = async categories => {
  const timeWall = await Category.findOne()
  if (
    !timeWall ||
    new Date().getTime() > timeWall.updatedAt.getTime() + SETTING_CACHE_TIMEOUT
  ) {
    const newIds = []
    categories.forEach(async category => {
      newIds.push(category.id)
      await Category.findOneAndUpdate({ id: category.id }, category, {
        upsert: true,
      })
    })
    const oldCategories = await Category.find({}, { id: true })
    oldCategories.forEach(cat => {
      if (!newIds.includes(cat.id)) {
        cat.remove()
      }
    })
  }
}

const setProductsCache = async products => {
  const timeWall = await Product.findOne()
  if (
    !timeWall ||
    new Date().getTime() > timeWall.updatedAt.getTime() + SETTING_CACHE_TIMEOUT
  ) {
    const newIds = []
    products.forEach(async product => {
      newIds.push(product.id)
      await Product.findOneAndUpdate({ id: product.id }, product, {
        upsert: true,
      })
    })
    const oldProducts = await Product.find({}, { id: true })
    oldProducts.forEach(prod => {
      if (!newIds.includes(prod.id)) {
        prod.remove()
      }
    })
  }
}

const getProducts = async (id = null) => {
  if (!id) {
    const products = await Product.find(
      {},
      { _id: false, updatedAt: false, createdAt: false, __v: false }
    )
    const query = await Product.findOne()
    const updatedAt = query.updatedAt
    return { cacheProducts: products, updatedAt }
  } else {
    const product = await Product.findOne(
      { id },
      { _id: false, createdAt: false, __v: false }
    )
    const updatedAt = product.updatedAt
    const prod = product.toObject()
    delete prod.updatedAt
    return { cacheProduct: prod, updatedAt }
  }
}

const getCategories = async (id = null) => {
  if (!id) {
    const categories = await Category.find(
      {},
      {
        _id: false,
        __v: false,
        createdAt: false,
        updatedAt: false,
        products: false,
      }
    )
    const query = await Category.findOne()
    const updatedAt = query.updatedAt
    return { cacheCategories: categories, updatedAt }
  } else {
    const category = await Category.findOne(
      { id },
      {
        _id: false,
        __v: false,
        createdAt: false,
        products: false,
      }
    )
    const updatedAt = category.updatedAt
    const cat = category.toObject()
    delete cat.updatedAt
    return { cacheCategory: cat, updatedAt }
  }
}

const getNestedCategories = async (id = null) => {
  if (!id) {
    const categories = await Category.find(
      {},
      {
        _id: false,
        __v: false,
        createdAt: false,
        updatedAt: false,
        'products._id': false,
      }
    )
    const query = await Category.findOne()
    const updatedAt = query.updatedAt
    return { cacheCategories: categories, updatedAt }
  } else {
    const category = await Category.findOne(
      { id },
      {
        _id: false,
        __v: false,
        createdAt: false,
        'products._id': false,
      }
    )
    const updatedAt = category.updatedAt
    const cat = category.toObject()
    delete cat.updatedAt
    return { cacheCategory: cat, updatedAt }
  }
}

module.exports = {
  setProductsCache,
  setCategoriesCache,
  getProducts,
  getCategories,
  getNestedCategories,
}
