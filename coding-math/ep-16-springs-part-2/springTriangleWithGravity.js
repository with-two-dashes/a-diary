import {
  registerRenderCycle,
  getCanvas,
  clearCanvas,
  startRender
} from './main.js'

import { drawCircle } from '../common/drawCircle.js'
import { drawLineBetween } from '../common/drawLineBetween.js'
import { makeParticle } from '../common/makeParticle.js'
import { randomRange } from '../common/randomRange.js'

const { width, height } = getCanvas()

const gravity = 2
const friction = 0.7
const radius = 20

const particleA = makeParticle({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: height }),
  direction: randomRange({ min: 0, max: Math.PI * 2 }),
  speed: randomRange({ min: 0, max: 50 }),
  radius,
  friction,
  gravity
})

const particleB = makeParticle({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: height }),
  direction: randomRange({ min: 0, max: Math.PI * 2 }),
  speed: randomRange({ min: 0, max: 50 }),
  radius,
  friction,
  gravity
})

const particleC = makeParticle({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: height }),
  direction: randomRange({ min: 0, max: Math.PI * 2 }),
  speed: randomRange({ min: 0, max: 50 }),
  radius,
  friction,
  gravity
})

const springLength = 200
const springStiffnessK = 0.2

registerRenderCycle(({ context, canvas, mousePosition }) => {
  clearCanvas()

  const { height } = canvas

  // particleA.position.x = mousePosition.x
  // particleA.position.y = mousePosition.y

  spring({
    particleA,
    particleB,
    stiffness: springStiffnessK,
    seperation: springLength
  })

  spring({
    particleA: particleA,
    particleB: particleC,
    stiffness: springStiffnessK,
    seperation: springLength
  })

  spring({
    particleA: particleC,
    particleB: particleB,
    stiffness: springStiffnessK,
    seperation: springLength
  })

  particleA.update()
  particleB.update()
  particleC.update()

  if (particleA.position.y + particleA.radius >= height) {
    particleA.position.y = height - particleA.radius
  }

  if (particleB.position.y + particleB.radius >= height) {
    particleB.position.y = height - particleB.radius
  }

  if (particleC.position.y + particleC.radius >= height) {
    particleC.position.y = height - particleC.radius
  }

  drawLineBetween({
    positionA: particleA.position,
    positionB: particleB.position,
    context
  })

  drawLineBetween({
    positionA: particleA.position,
    positionB: particleC.position,
    context
  })

  drawLineBetween({
    positionA: particleB.position,
    positionB: particleC.position,
    context
  })

  drawCircle({
    context,
    position: particleA.position,
    radius: particleA.radius
  })

  drawCircle({
    context,
    position: particleB.position,
    radius: particleB.radius
  })

  drawCircle({
    context,
    position: particleC.position,
    radius: particleC.radius
  })
})

const spring = ({ particleA, particleB, seperation = 0, stiffness = 0.2 }) => {
  const distanceVector = particleA.position.subtract(particleB.position)
  distanceVector.length -= seperation

  const springForceVector = distanceVector.multiply(stiffness)

  particleB.velocity.addTo(springForceVector)
  particleA.velocity.subtractFrom(springForceVector)
}

startRender()
