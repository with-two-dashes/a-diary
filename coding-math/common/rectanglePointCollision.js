import { inRange } from './inRange.js'
export const rectanglePointCollision = ({ rectangle, point }) => {
  const xIsInRange = inRange({
    value: point.x,
    min: rectangle.x,
    max: rectangle.x + rectangle.width
  })
  const yIsInRange = inRange({
    value: point.y,
    min: rectangle.y,
    max: rectangle.y + rectangle.height
  })
  return xIsInRange && yIsInRange
}