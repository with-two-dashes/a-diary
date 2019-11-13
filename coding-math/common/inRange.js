export const inRange = ({ min, max, value }) => {
  const smallest = Math.min(min, max)
  const largest = Math.max(min, max)
  return (value >= smallest) && (value <= largest)
}