// info is defined in ./helpers/restrictionsInfo

const notMedicine = function(info, productId) {
  return !info.productsContext['MEDICAMENTOS'].includes(productId)
}

const notBeenBoughtToday = function(info, productId) {
  if (info.parsedOrders[productId]) {
    const fact = info.parsedOrders[productId].every(
      date =>
        date.getTime() < new Date(new Date() - 24 * 60 * 60 * 1000).getTime()
    )
    return fact
  }
  return true
}

module.exports = [notMedicine, notBeenBoughtToday]
