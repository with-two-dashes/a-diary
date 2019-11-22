import { circleCollision } from './circleCollision.js'

const getParticlesCollidingWith = (worldParticlesArray, particle) => {
  return worldParticlesArray.filter((worldParticle) => {
    return circleCollision({ circleA: particle, circleB: worldParticle })
  })
}

export const simulation = ({
  globalGravityY = 0
}) => {
  const globalParticleSet = new Set()

  const simulateGravity = () => {
    globalParticleSet.forEach(particle => particle.calculateGravity())
  }

  const simulateAccelerate = (delta) => {
    globalParticleSet.forEach(particle => particle.accelerate(delta))
  }

  const simulateInertia = () => {
    globalParticleSet.forEach(particle => particle.inertia())
  }

  const simulateConstrainToWorld = () => {
    globalParticleSet.forEach(particle => particle.constrainToWorld())
  }

  const simulateConstrainToWorldWithImpulse = () => {
    globalParticleSet.forEach(particle => particle.constrainToWorldWithImpulse)
  }

  const simulateCollide = () => {
    globalParticleSet.forEach(particle => {
      globalParticleSet.forEach(particle2 => {
        particle.collideWith(particle2)
      })
    })
  }

  const simulateCollideWithImpulse = () => {
    globalParticleSet.forEach(particle => {
      globalParticleSet.forEach(particle2 => {
        particle.collideWithImpulse(particle2)
      })
    })
  }

  const step = (deltaTime) => {

    const stepCount = 2
    const delta = (1 / stepCount)
    for (let i = 0; i < stepCount; i++) {
      simulateGravity()
      simulateAccelerate(delta)
      simulateCollide()
      simulateConstrainToWorld()
      simulateInertia(delta)
      // simulateCollideWithImpulse()
      simulateConstrainToWorldWithImpulse()
    }
  }

  const makeParticle = ({
    x,
    y,
    radius = 0,
    mass = 1,
    friction = 1,
    ...rest
  }) => {

    let internalId = Math.floor(Math.random() * 1000000000000000)

    let internalFriction = friction

    let internalX = x
    let internalOldX = x

    let internalY = y
    let internalOldY = y

    let internalXForceBucket = 0
    let internalYForceBucket = 0

    let internalRadius = radius
    let internalMass = mass

    let internalWorldLeft = -Infinity
    let internalWorldRight = Infinity
    let internalWorldTop = -Infinity
    let internalWorldBottom = Infinity

    const calculateGravity = () => {
      internalYForceBucket += (globalGravityY * mass)
    }

    const accelerate = delta => {
      internalX += internalXForceBucket * delta * delta
      internalY += internalYForceBucket * delta * delta
      internalXForceBucket = 0
      internalYForceBucket = 0
    }

    const inertia = () => {
      const x = internalX * 2 - internalOldX
      const y = internalY * 2 - internalOldY
      internalOldX = internalX
      internalOldY = internalY
      internalX = x
      internalY = y
    }

    const setWorldConstraints = ({
      left = -Infinity,
      right = Infinity,
      bottom = Infinity,
      top = -Infinity
    }) => {
      internalWorldLeft = left
      internalWorldRight = right
      internalWorldBottom = bottom
      internalWorldTop = top
    }

    const constrainToWorld = () => {
      if (internalX - radius < internalWorldLeft) {
        internalX = radius
      } else if (internalX + radius > internalWorldRight) {
        internalX = internalWorldRight - radius
      }
      if (internalY - radius < internalWorldTop) {
        internalY = radius
      } else if (internalY + radius > internalWorldBottom) {
        internalY = internalWorldBottom - radius
      }
    }

    const constrainToWorldWithImpulse = () => {
      const vx = (internalOldX - internalX) * internalFriction
      const vy = (internalOldY - internalY) * internalFriction
      if (internalX - radius < internalWorldLeft) {
        internalX = radius
        internalOldX = internalX - vx
      } else if (internalX + radius > internalWorldRight) {
        internalX = internalWorldRight - radius
        internalOldX = internalX - vx
      }
      if (internalY - radius < internalWorldTop) {
        internalY = radius
        internalOldY = internalY - vy
      } else if (internalY + radius > internalWorldBottom) {
        internalY = internalWorldBottom - radius
        internalOldY = internalY - vy
      }
    }

    const collideWith = otherParticle => {
      if (otherParticle.id !== internalId) {
        const x = internalX - otherParticle.x
        const y = internalY - otherParticle.y
        const actualDistance = Math.sqrt((x * x) + (y * y))
        const touchingDistance = internalRadius + otherParticle.radius
        if (actualDistance < touchingDistance) {
          const factor = ((actualDistance - touchingDistance) / actualDistance) * 0.5
          internalX -= x * factor
          internalY -= y * factor
          otherParticle.x += x * factor
          otherParticle.y += y * factor
        }
      }
    }

    const collideWithImpulse = otherParticle => {
      if (otherParticle.id !== internalId) {
        const x = internalX - otherParticle.x
        const y = internalY - otherParticle.y
        const squaredDistance = (x * x) + (y * y)
        const actualDistance = Math.sqrt(squaredDistance)
        const touchingDistance = internalRadius + otherParticle.radius
        if (actualDistance < touchingDistance) {
          const velocityAX = internalX - internalOldX
          const velocityAY = internalY - internalOldY
          const velocityBX = otherParticle.x - otherParticle.oldX
          const velocityBY = otherParticle.y - otherParticle.oldY

          const factor = ((actualDistance - touchingDistance) / actualDistance) * 0.5

          internalX -= x * factor
          internalY -= y * factor
          otherParticle.x += x * factor
          otherParticle.y += y * factor

          const f1 = (internalFriction * (x * velocityAX) + (y * velocityAY)) / squaredDistance
          const f2 = (internalFriction * (x * velocityBX) + (y * velocityBY)) / squaredDistance

          const finalVelocityAX = velocityBX + f2 * x - f1 * x
          const finalVelocityBX = velocityAX + f1 * x - f2 * x
          const finalVelocityAY = velocityBY + f2 * y - f1 * y
          const finalVelocityBY = velocityAY + f1 * y - f2 * y

          internalOldX = internalX - finalVelocityAX
          internalOldY = internalY - finalVelocityAY
          otherParticle.oldX = otherParticle.x - finalVelocityBX
          otherParticle.oldY = otherParticle.y - finalVelocityBY
        }
      }
    }

    const particleInterface = {
      calculateGravity,
      accelerate,
      inertia,
      setWorldConstraints,
      constrainToWorld,
      constrainToWorldWithImpulse,
      collideWith,
      collideWithImpulse,
      destroy,
      get id() {
        return internalId
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
      get mass() {
        return internalMass
      },
      set mass(newMass) {
        internalMass = newMass
      },
      get radius() {
        return internalRadius
      },
      set radius(newRadius) {
        internalRadius = newRadius
      },
      get friction() {
        return internalFriction
      },
      set friction(newFriction) {
        internalFriction = newFriction
      },
      ...rest
    }

    function destroy() {
      globalParticleSet.delete(particleInterface)
    }

    globalParticleSet.add(particleInterface)

    return particleInterface
  }

  return {
    step,
    makeParticle
  }
}