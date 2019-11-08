export const clearCanvas = ({ context }) => {
  const { canvas } = context
  const { width, height } = canvas
  context.clearRect(0, 0, width, height)
}
