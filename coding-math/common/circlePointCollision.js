import { getDistanceXY } from './getDistanceXY'
export const circlePointCollision = ({ circle, point }) => {
  const distance = getDistanceXY({
    x0: point.x,
    y0: point.y,
    x1: circle.x,
    y1: circle.y
  })
  const isColliding = distance < circle.radius
  return isColliding
}