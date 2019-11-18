export const getDistance = ({ pointA, pointB }) => {
  const distanceX = pointA.x - pointB.x
  const distanceY = pointA.y - pointB.y
  return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
}