export const drawLineBetween = ({ positionA, positionB, context }) => {
  context.beginPath()
  context.moveTo(positionA.x, positionA.y)
  context.lineTo(positionB.x, positionB.y)
  context.stroke()
}
