const parseCategories = (rawCategories, products) => {
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

const parseOrders = orders => {
  const parsedOrders = orders.reduce(
    (co, ord) => ({
      ...co,
      [ord.productId]: [...(co[ord.productId] || []), ord.sentAt],
    }),
    {}
  )
  return parsedOrders
}

const parseContext = nestedCategories => {
  const productsContext = nestedCategories.reduce(
    (cc, cat) => ({
      ...cc,
      [cat.context]: [
        ...(cc[cat.context] || []),
        ...cat.products.map(prod => prod.id),
      ],
    }),
    {}
  )
  return productsContext
}

const parseFeedback = feedback => {
  const key = Object.keys(feedback)[0]
  const parsedFeedback = feedback[key].reduce(
    (cp, prod) => [...cp, { productId: prod.id, productName: prod.name }],
    []
  )
  return parsedFeedback
}

module.exports = { parseCategories, parseOrders, parseContext, parseFeedback }
