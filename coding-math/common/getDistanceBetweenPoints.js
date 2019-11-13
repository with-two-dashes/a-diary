export const getDistanceBetweenPoints = ({ pointA, pointB }) => {
  const dx = pointB.x - pointA.x
  const dy = pointB.y - pointA.y
  return Math.sqrt((dx * dx) + (dy * dy))
}