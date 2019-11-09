export const makeRepeater = fn => count => {
  for (let i = 0; i < count; i++) {
    fn(i, count)
  }
}