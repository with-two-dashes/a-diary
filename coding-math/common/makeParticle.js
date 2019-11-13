import { makeVector } from './makeVector.js'

const StopThreshhold = 0.3

export const makeParticle = ({
  x,
  y,
  speed = 0,
  direction = 0,
  gravity = 0,
  mass = 1,
  radius = 0,
  bounce = -1,
  friction = 1
}) => {

  const internalPosition = makeVector({ x, y })
  const internalVelocity = makeVector({ x: 0, y: 0 })
  const internalGravity = makeVector({ x: 0, y: gravity })

  let internalMass = mass
  let internalRadius = radius
  let internalBounce = bounce

  internalVelocity.length = speed
  internalVelocity.angle = direction

  const update = () => {
    if (internalVelocity.length * friction > StopThreshhold) {
      internalVelocity.multiplyBy(friction)
    } else {
      internalVelocity.length = 0
    }
    internalVelocity.addTo(internalGravity)
    internalPosition.addTo(internalVelocity)
  }

  const accelerate = vector => {
    internalVelocity.addTo(vector)
  }

  const angleTo = otherParticle => {
    const y = otherParticle.position.y - internalPosition.y
    const x = otherParticle.position.x - internalPosition.x
    return Math.atan2(y, x)
  }

  const distanceTo = otherParticle => {
    const distanceX = otherParticle.position.x - internalPosition.x
    const distanceY = otherParticle.position.y - internalPosition.y
    return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
  }

  const gravatateTo = otherParticle => {
    const gravityVector = makeVector({ x: 0, y: 0 })
    const distance = distanceTo(otherParticle)
    gravityVector.length = otherParticle.mass / (distance * distance)
    gravityVector.angle = angleTo(otherParticle)
    internalVelocity.addTo(gravityVector)
  }

  return {
    update,
    accelerate,
    angleTo,
    distanceTo,
    gravatateTo,
    get radius() {
      return internalRadius
    },
    set radius(newRadius) {
      internalRadius = newRadius
    },
    get position() {
      return internalPosition
    },
    get velocity() {
      return internalVelocity
    },
    get speed() {
      return internalVelocity.length
    },
    set speed(newSpeed) {
      internalVelocity.length = newSpeed
    },
    get direction() {
      return internalVelocity.angle
    },
    set direction(direction) {
      internalVelocity.angle = direction
    },
    get mass() {
      return internalMass
    },
    set mass(newMass) {
      internalMass = newMass
    },
    get bounce() {
      return internalBounce
    },
    set bounce(newBounce) {
      internalBounce = newBounce
    }
  }

}