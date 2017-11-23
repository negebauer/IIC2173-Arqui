const stringCombinations = query => {
  const combinations = []

  // words with missing letter
  let counter = 0
  while (counter < query.length) {
    let string = ''
    let counter2 = 0
    for (const letter of query) {
      if (counter !== counter2) {
        string += letter
      }
      counter2 += 1
    }
    combinations.push(string)
    counter += 1
  }

  // words with wrong letter
  counter = 0
  while (counter < query.length) {
    let string = ''
    let counter2 = 0
    for (const letter of query) {
      if (counter !== counter2) {
        string += letter
      } else {
        string += '.'
      }
      counter2 += 1
    }
    combinations.push(string)
    counter += 1
  }

  // words with extra letter
  counter = 0
  while (counter <= query.length) {
    const string =
      query.slice(0, counter) + '.' + query.slice(counter, query.length)
    combinations.push(string)
    counter += 1
  }

  // words with two letters swapped
  counter = 0
  while (counter < query.length - 1) {
    const string =
      query.slice(0, counter) +
      query[counter + 1] +
      query[counter] +
      query.slice(counter + 2, query.length)
    combinations.push(string)
    counter += 1
  }

  return combinations
}

module.exports = stringCombinations
