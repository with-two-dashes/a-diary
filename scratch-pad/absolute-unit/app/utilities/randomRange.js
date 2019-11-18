export const randomRange = ({ min, max }) => {
  const smallest = Math.min(min, max)
  const largest = Math.max(min, max)
  return Math.random() * (largest - smallest) + smallest
}
