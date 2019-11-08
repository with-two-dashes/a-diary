export const computeRatio = ({ min, max, value }) => {
  return (value - min) / (max - min)
}
