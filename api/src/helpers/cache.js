const Category = require("../models/category")
const { SETTING_CACHE_TIMEOUT } = require("../constants")

const setCache = async categories => {
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

const getProducts = async () => {
  const categories = await Category.find({}, { "products._id": false })
  if (!categories) {
    return null
  }
  const products = categories.reduce(
    (prods, category) => [...prods, ...category.products],
    []
  )
  return products
}

const getCategories = async (id = null) => {
  let categories
  if (!id) {
    categories = await Category.find(
      {},
      {
        _id: false,
        __v: false,
        createdAt: false,
        products: false,
      }
    )
  } else {
    categories = await Category.find(
      { id },
      {
        _id: false,
        __v: false,
        createdAt: false,
        products: false,
      }
    )
  }
  return categories
}

const getNestedCategories = async (id = null) => {
  let categories
  if (!id) {
    categories = await Category.find(
      {},
      {
        _id: false,
        __v: false,
        createdAt: false,
        "products._id": false,
      }
    )
  } else {
    categories = await Category.find(
      { id },
      {
        _id: false,
        __v: false,
        createdAt: false,
        "products._id": false,
      }
    )
  }
  return categories
}

module.exports = { setCache, getProducts, getCategories, getNestedCategories }
