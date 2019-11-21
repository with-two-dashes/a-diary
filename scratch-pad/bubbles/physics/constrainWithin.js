export const constrainWithin = ({
  maxX,
  maxY,
  minX,
  minY,
  particle
}) => {
  const { radius, vx, vy, bounce } = particle
  if (particle.y + radius > maxY) {
    particle.y = maxY - radius
    particle.oldY = maxY - radius + (vy * bounce)
  } else if (particle.y - radius < minY) {
    particle.y = minY + radius
    particle.oldY = minY + radius + (vy * bounce)
  }

  if (particle.x + particle.radius > maxX) {
    particle.x = maxX - radius
    particle.oldX = maxX - radius + (vx * bounce)
  } else if (particle.x - radius < minX) {
    particle.x = minX + radius
    particle.oldX = minX + radius + (vx * bounce)
  }
}
