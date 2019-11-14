export const drawCircle = ({
  context,
  position,
  radius,
  fillStyle,
  strokeStyle,
}) => {
  context.beginPath()
  context.arc(position.x, position.y, radius, 0, Math.PI * 2, false)
  context.fill()
  context.stroke()
}