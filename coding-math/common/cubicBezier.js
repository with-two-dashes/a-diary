export const cubicBezier = ({
  point0,
  point1,
  point2,
  point3,
  t
}) => {
  const oneMinusT = (1 - t)
  const cubedOneMinusT = Math.pow(oneMinusT, 3)
  const squaredOneMinusT = Math.pow(oneMinusT, 2)
  const compute = axis => {
    const A = point0[axis] * cubedOneMinusT
    const B = point1[axis] * squaredOneMinusT * 3 * t
    const C = point2[axis] * oneMinusT * 3 * t * t
    const D = point3[axis] * t * t * t
    return A + B + C + D
  }
  const x = compute('x')
  const y = compute('y')
  return { x, y }
}