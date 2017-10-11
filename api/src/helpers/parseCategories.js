module.exports = (rawCategories, products) => {
  const categoryProducts = products.reduce(
    (cp, product) => ({
      ...cp,
      [product.category]: [...(cp[product.category] || []), product],
    }),
    {}
  )
  const categories = rawCategories.map(category => ({
    ...category,
    products: categoryProducts[category.id] || [],
  }))
  return categories
}
