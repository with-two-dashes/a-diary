export const makeVerletEngine = ({
  x = 0,
  y = 0,
  baseX = 0,
  baseY = 0,
  angle = 0,
  speed = 0,
  range = 0,
  isPinned = false
}) => {
  let internalX = x
  let internalY = y
  let internalBaseX = baseX
  let internalBaseY = baseY
  let internalAngle = angle
  let internalSpeed = speed
  let internalRange = range
  let internalIsPinned = isPinned

  const update = () => {
    internalX = internalBaseX + Math.cos(internalAngle) * internalRange
    internalY = internalBaseY + Math.sin(internalAngle) * internalRange
    internalAngle += internalSpeed
  }

  return {
    update,
    get x () {
      return internalX
    },
    set x (newX) {
      internalX = newX
    },
    get y () {
      return internalY
    },
    set y (newY) {
      internalY = newY
    },
    get baseX () {
      return internalBaseX
    },
    set baseX (newBaseX) {
      internalBaseX = newBaseX
    },
    get baseY () {
      return internalBaseY
    },
    set baseY (newBaseY) {
      internalBaseY = newBaseY
    },
    get angle () {
      return internalAngle
    },
    set angle (newAngle) {
      internalAngle = newAngle
    },
    get speed () {
      return internalSpeed
    },
    set speed (newSpeed) {
      internalSpeed = newSpeed
    },
    get range () {
      return internalRange
    },
    set range (newRange) {
      internalRange = newRange
    },
    get isPinned () {
      return internalIsPinned
    },
    set isPinned (newIsPinned) {
      internalIsPinned = newIsPinned
    }
  }
}
