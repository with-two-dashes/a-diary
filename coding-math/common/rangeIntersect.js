export const rangeIntersect = ({ min0, max0, min1, max1 }) => {
  const smallest0 = Math.min(min0, max0)
  const largest0 = Math.max(min0, max0)
  const smallest1 = Math.min(min1, max1)
  const largest1 = Math.max(min1, max1)
  return largest0 >= smallest1 && smallest0 <= largest1
}