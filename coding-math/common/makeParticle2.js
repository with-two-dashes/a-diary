export const makeParticle = ({
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
  speed = 0,
  direction = 0,
  gravity = 0,
  mass = 1,
  radius = 0,
  bounce = -1,
  friction = 1
}) => {
  let internalX = x
  let internalY = y
  let internalVX = vx
  let internalVY = vy
  let internalDirection = direction
  let internalSpeed = speed
  let internalMass = mass
  let internalRadius = radius
  let internalBounce = bounce
  let internalGravity = gravity
  let internalFriction = friction

  internalVX = Math.cos(internalDirection) * internalSpeed
  internalVY = Math.sin(internalDirection) * internalSpeed

  const update = () => {
    internalVX *= internalFriction
    internalVY *= internalFriction
    internalVY += internalGravity
    internalX += internalVX
    internalY += internalVY
  }

  const accelerate = ({ x, y }) => {
    internalX += x
    internalY += y
  }

  const angleTo = otherParticle => {
    const y = otherParticle.y - internalY
    const x = otherParticle.x - internalX
    return Math.atan2(y, x)
  }

  const distanceTo = otherParticle => {
    const distanceX = otherParticle.x - internalX
    const distanceY = otherParticle.y - internalY
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY)
    return Math.sqrt(distanceSquared)
  }

  const gravatateTo = otherParticle => {
    const { mass, x, y } = otherParticle
    const distanceX = x - internalX
    const distanceY = y - internalY
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY)
    const distance = Math.sqrt(distanceSquared)
    const force = mass / distanceSquared
    const accelerationX = (distanceX / distance) * force
    const accelerationY = (distanceY / distance) * force
    internalVX += accelerationX
    internalVY += accelerationY
  }

  return {
    update,
    accelerate,
    angleTo,
    distanceTo,
    gravatateTo,
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
    get vx () {
      return internalVX
    },
    set vx (newVX) {
      internalVX = newVX
    },
    get vy () {
      return internalVY
    },
    set vy (newVY) {
      internalVY = newVY
    },
    get radius () {
      return internalRadius
    },
    set radius (newRadius) {
      internalRadius = newRadius
    },
    get speed () {
      return internalSpeed
    },
    set speed (newSpeed) {
      internalSpeed = newSpeed
    },
    get direction () {
      return internalDirection
    },
    set direction (direction) {
      internalDirection = direction
    },
    get mass () {
      return internalMass
    },
    set mass (newMass) {
      internalMass = newMass
    },
    get bounce () {
      return internalBounce
    },
    set bounce (newBounce) {
      internalBounce = newBounce
    },
    get gravity () {
      return internalGravity
    },
    set gravity (newGravity) {
      internalGravity = newGravity
    },
    get friction () {
      return internalFriction
    },
    set friction (newFriction) {
      internalFriction = newFriction
    }
  }
}
