import { getDistanceBetweenPoints } from './getDistanceBetweenPoints.js'
export const circleCollision = ({ circleA, circleB }) => {
  const distance = getDistanceBetweenPoints({
    pointA: circleA,
    pointB: circleB
  })
  const isColliding = distance <= (circleA.radius + circleB.radius)
  return isColliding
}