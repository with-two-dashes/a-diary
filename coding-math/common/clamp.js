// locks a value between the min and max values.
export const clamp = ({ min, max, value }) => {
  const smallest = Math.min(min, max)
  const largest = Math.max(min, max)
  return Math.min(largest, Math.max(smallest, value))
}