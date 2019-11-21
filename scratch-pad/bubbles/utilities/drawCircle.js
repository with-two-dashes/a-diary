export const drawCircle = ({
  x,
  y,
  radius,
  context,
  strokeStyle = 'black',
  fillStyle = 'black',
  skipStroke = true,
  skipFill = false
}) => {
  context.beginPath()
  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle
  context.arc(x, y, radius, 0, Math.PI * 2, false)
  if (!skipStroke) {
    context.stroke()
  }
  if (!skipFill) {
    context.fill()
  }
}
