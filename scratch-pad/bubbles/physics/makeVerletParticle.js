import { makeVector } from './makeVector.js'

export const makeVerletParticle = ({
  id,
  x = 0,
  y = 0,
  oldX = 0,
  oldY = 0,
  speed = 0,
  direction = 0,
  gravity = 0,
  mass = 1,
  radius = 0,
  bounce = 1,
  friction = 1,
  isPinned = false,
  ...rest
}) => {
  let internalID = id || Math.floor(Math.random() * 1000000000000)
  let internalX = x
  let internalY = y
  let internalOldX = oldX || x
  let internalOldY = oldY || y
  let internalRadius = radius
  let internalBounce = bounce
  let internalGravity = gravity
  let internalFriction = friction
  let internalIsPinned = isPinned
  let internalMass = mass

  let internalStoredAccelerationX = 0
  let internalStoredAccelerationY = 0

  setSpeed(speed)
  setDirection(direction)

  function considerGravity() {
    internalStoredAccelerationY += internalGravity
  }

  function accelerate(delta) {
    const deltaSquared = delta * delta
    internalX += internalStoredAccelerationX * deltaSquared
    internalY += internalStoredAccelerationY * deltaSquared
    internalStoredAccelerationX = 0
    internalStoredAccelerationY = 0
  }

  function inertia(delta) {
    const x = internalX * 2 - internalOldX
    const y = internalY * 2 - internalOldY
    internalOldX = internalX * delta
    internalOldY = internalY * delta
    internalX = x
    internalY = y
  }

  function getSpeed() {
    const vx = internalX - internalOldX
    const vy = internalY - internalOldY
    return Math.sqrt((vx * vx) + (vy * vy))
  }

  function setSpeed(newSpeed) {
    const angle = getDirection()
    internalOldX += Math.cos(angle) * newSpeed
    internalOldY += Math.sin(angle) * newSpeed
  }

  function getDirection() {
    const speed = getSpeed()
    const vx = (internalX - internalOldX) * speed
    const vy = (internalY - internalOldY) * speed
    return Math.atan2(vy, vx)
  }

  function setDirection(newAngle) {
    const speed = getSpeed()
    internalOldX += Math.cos(newAngle) * speed
    internalOldY += Math.sin(newAngle) * speed
  }

  const update = () => {
    if (!internalIsPinned) {
      const vx = (internalX - internalOldX) * internalFriction
      const vy = (internalY - internalOldY) * internalFriction
      internalOldX = internalX
      internalOldY = internalY
      internalX += vx
      internalY += vy
      internalY += internalGravity
    }
  }

  const collideWithWorld = ({
    worldLeft,
    worldRight,
    worldTop,
    worldBottom
  }) => {

    const vx = internalX - internalOldX
    const vy = internalY - internalOldY

    if (internalY + internalRadius > worldBottom) {
      internalY = worldBottom - radius
      // internalStoredAccelerationY += (vy * internalBounce)
    } else if (internalY - radius < worldTop) {
      internalY = worldTop + radius
      // internalStoredAccelerationY += (vy * internalBounce)
    }

    if (internalX + internalRadius > worldRight) {
      internalX = worldRight - radius
      // internalStoredAccelerationX += (vx * internalBounce)
    } else if (internalX - internalRadius < worldLeft) {
      internalX = worldLeft + radius
      // internalStoredAccelerationX += (vx * internalBounce)
    }
  }

  const collide = () => {

  }

  const update2 = ({
    delta,
    worldLeft,
    worldRight,
    worldTop,
    worldBottom
  }) => {
    // considerGravity()
    accelerate(delta)
    // collide()
    // collideWithWorld({
    //   worldLeft,
    //   worldRight,
    //   worldTop,
    //   worldBottom
    // })
    inertia(delta)
  }

  const api = {
    update,
    update2,
    collideWith,
    get velocityVector() {
      return getVelocityVector()
    },
    set velocityVector(vector) {
      setVelocityVector(vector)
    },
    get id() {
      return internalID
    },
    set id(newID) {
      internalID = newID
    },
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
    get vx() {
      return internalX - internalOldX
    },
    set vx(newVX) {
      internalOldX += newVX
    },
    get vy() {
      return internalY - internalOldY
    },
    set vy(newVY) {
      internalOldY += newVY
    },
    get oldX() {
      return internalOldX
    },
    set oldX(newOldX) {
      internalOldX = newOldX
    },
    get oldY() {
      return internalOldY
    },
    set oldY(newOldY) {
      internalOldY = newOldY
    },
    get radius() {
      return internalRadius
    },
    set radius(newRadius) {
      internalRadius = newRadius
    },
    get bounce() {
      return internalBounce
    },
    set bounce(newBounce) {
      internalBounce = newBounce
    },
    get gravity() {
      return internalGravity
    },
    set gravity(newGravity) {
      internalGravity = newGravity
    },
    get friction() {
      return internalFriction
    },
    set friction(newFriction) {
      internalFriction = newFriction
    },
    get isPinned() {
      return internalIsPinned
    },
    set isPinned(newIsPinned) {
      internalIsPinned = newIsPinned
    },
    get mass() {
      return internalMass
    },
    set mass(newMass) {
      internalMass = newMass
    },
    get direction() {
      return getDirection()
    },
    set direction(angle) {
      setDirection(angle)
    },
    get speed() {
      return getSpeed()
    },
    set speed(newSpeed) {
      setSpeed(newSpeed)
    },
    ...rest
  }

  function getVelocityVector() {
    const vector = makeVector({})
    vector.angle = getDirection()
    vector.length = getSpeed()
    return vector
  }

  function setVelocityVector(vector) {
    setDirection(vector.angle)
    setSpeed(vector.length)
  }

  function collideWith(otherParticle) {
    const spring = 0.3
    if (otherParticle.id !== internalID) { // don't collide with yourself.

    }
  }

  return api
}
