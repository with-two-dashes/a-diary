export const makeVerletParticle = ({
  x = 0,
  y = 0,
  oldX = 0,
  oldY = 0,
  speed = 0,
  direction = 0,
  gravity = 0,
  mass = 1,
  radius = 0,
  bounce = -1,
  friction = 1,
  isPinned = false
}) => {

  let internalX = x
  let internalY = y
  let internalOldX = oldX
  let internalOldY = oldY
  let internalRadius = radius
  let internalBounce = bounce
  let internalGravity = gravity
  let internalFriction = friction
  let internalIsPinned = isPinned

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

  const api = {
    update,
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
    }
  }

  return api
}