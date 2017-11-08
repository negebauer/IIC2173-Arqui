const moment = require('moment')

const parse = date => {
  const dt = moment(date).format('H:mm D[/]M[/]YYYY')
  return dt
}

module.exports = (arr, key = 'date') => {
  const parsedArr = arr.reduce(
    (ca, obj) => [...ca, { ...obj, [key]: parse(obj[key]) }],
    []
  )
  return parsedArr
}
