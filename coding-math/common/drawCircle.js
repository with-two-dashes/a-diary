export const drawCircle = ({
  context,
  position,
  radius,
  fillStyle,
  strokeStyle,
  fill = true,
  stroke = true,
}) => {
  context.beginPath()
  if (fillStyle) {
    context.fillStyle = fillStyle
  }
  if (strokeStyle) {
    context.strokeStyle = strokeStyle
  }
  context.arc(position.x, position.y, radius, 0, Math.PI * 2, false)
  if (fill) {
    context.fill()
  }
  if (stroke) {
    context.stroke()
  }
}