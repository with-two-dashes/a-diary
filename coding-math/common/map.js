import { norm } from './norm.js'
import { lerp } from './lerp.js'

// leverages both tools above to map one set of values onto another.

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