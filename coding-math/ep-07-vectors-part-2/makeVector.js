export const makeVector = ({
  x = 1,
  y = 0
}) => {
  // note, the 0 and 1 here create a "Unit Vector at Angle Zero... "
  // a unit vector is a vector with a value of 1
  let internalX = x
  let internalY = y

  const add = otherVector => {
    const x = internalX + otherVector.x
    const y = internalY + otherVector.y
    return makeVector({ x, y })
  }

  const subtract = otherVector => {
    const x = internalX - otherVector.x
    const y = internalY - otherVector.y
    return makeVector({ x, y })
  }

  const clone = () => {
    const x = internalX
    const y = internalY
    return makeVector({ x, y })
  }

  const multiply = ammount => {
    const x = internalX * ammount
    const y = internalY * ammount
    return makeVector({ x, y })
  }

  const divide = ammount => {
    const x = internalX / ammount
    const y = internalY / ammount
    return makeVector({ x, y })
  }

  // these are kinda icky

  const addTo = otherVector => {
    internalX += otherVector.x
    internalY += otherVector.y
  }

  const subtractFrom = otherVector => {
    internalX -= otherVector.x
    internalY -= otherVector.y
  }

  const multiplyBy = value => {
    internalX *= value
    internalY *= value
  }

  const divideBy = value => {
    internalX /= value
    internalY /= value
  }

  return {
    clone,
    add,
    subtract,
    multiply,
    divide,
    addTo,
    subtractFrom,
    multiplyBy,
    divideBy,
    get x() {
      return internalX
    },
    set x(newX) {
      internalX = newX
    },
    get y() {
      return internalY
    },
    set y(newY) {
      internalY = newY
    },
    set length(length) {
      const { angle } = this
      internalX = Math.cos(angle) * length
      internalY = Math.sin(angle) * length
    },
    get length() {
      return Math.sqrt((internalX * internalX) + (internalY * internalY))
    },
    set angle(angle) {
      const { length } = this
      internalX = Math.cos(angle) * length
      internalY = Math.sin(angle) * length
    },
    get angle() {
      const x = internalX
      const y = internalY
      return Math.atan2(y, x)
    },
  }
}