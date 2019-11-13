import { rangeIntersect } from './rangeIntersect.js'

export const rectangleRectangleCollision = ({ rectangleA, rectangleB }) => {
  const minRectAX = rectangleA.x
  const maxRectAX = rectangleA.x + rectangleA.width

  const minRectAY = rectangleA.y
  const maxRectAY = rectangleA.y + rectangleA.height

  const minRectBX = rectangleB.x
  const maxRectBX = rectangleB.x + rectangleB.width

  const minRectBY = rectangleB.y
  const maxRectBY = rectangleB.y + rectangleB.height

  const isIntersectingX = rangeIntersect({
    min0: minRectAX,
    max0: maxRectAX,
    min1: minRectBX,
    max1: maxRectBX
  })

  const isIntersectingY = rangeIntersect({
    min0: minRectAY,
    max0: maxRectAY,
    min1: minRectBY,
    max1: maxRectBY,
  })

  const isColliding = isIntersectingX && isIntersectingY

  return isColliding
}