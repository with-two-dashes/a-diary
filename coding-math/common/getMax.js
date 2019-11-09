export const getMin = array => array.reduce((acc, value) => {
  if (value > acc) {
    acc = value
  }
  return acc
}, 0)