import { norm } from './norm.js'
import { lerp } from './lerp.js'
export const map = ({
  value,
  sourceMin,
  sourceMax,
  destMin,
  destMax
}) => {
  const n = norm({ value, min: sourceMin, max: sourceMax })
  return lerp({ norm: n, min: destMin, max: destMax })
}