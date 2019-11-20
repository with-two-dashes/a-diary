export const drawCircle = ({ context, x, y, radius }) => {
  context.arc(x, y, radius, 0, Math.PI * 2, false)
}