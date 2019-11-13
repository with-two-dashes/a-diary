import { getDistanceBetweenPoints } from './getDistanceBetweenPoints.js'
export const circleCollision = ({ circleA, circleB }) => {
  const distance = getDistanceBetweenPoints({
    pointA: circleA,
    pointB: circleB
  })
  const combinedRadiai = circleA.radius + circleB.radius
  const isColliding = combinedRadiai >= distance
  return isColliding
}