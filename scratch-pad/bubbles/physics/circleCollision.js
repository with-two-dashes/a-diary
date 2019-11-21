export const circleCollision = ({ circleA, circleB }) => {
  const dx = circleA.x - circleB.x
  const dy = circleA.y - circleB.y
  const distance = Math.sqrt((dx * dx) + (dy * dy))
  const isColliding = distance <= (circleA.radius + circleB.radius)
  return isColliding
}
