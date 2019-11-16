export const quadraticBezier = ({
  point0,
  point1,
  point2,
  t,
}) => {
  const oneMinusT = 1 - t
  const squaredOneMinusT = Math.pow(oneMinusT, 2)
  const compute = axis => {
    const A = point0[axis] * squaredOneMinusT
    const B = point1[axis] * oneMinusT * 2 * t
    const C = point2[axis] * t * t
    return A + B + C
  }
  const x = compute('x')
  const y = compute('y')
  return { x, y }
}