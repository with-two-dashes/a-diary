import { makeVector } from './makeVector.js'

export const makeParticle = ({
  x,
  y,
  speed = 0,
  direction = 0,
  gravity = 0
}) => {

  const internalPosition = makeVector({ x, y })
  const internalVelocity = makeVector({ x: 0, y: 0 })
  const internalGravity = makeVector({ x: 0, y: gravity })

  internalVelocity.length = speed
  internalVelocity.angle = direction

  const update = () => {
    internalVelocity.addTo(internalGravity)
    internalPosition.addTo(internalVelocity)
  }

  const accelerate = vector => {
    internalVelocity.addTo(vector)
  }

  return {
    update,
    accelerate,
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
    }
  }

}