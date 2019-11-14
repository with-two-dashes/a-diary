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

const particleA = makeParticle({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: height }),
  direction: randomRange({ min: 0, max: Math.PI * 2 }),
  speed: randomRange({ min: 0, max: 50 }),
  radius: 20,
  friction: 0.9
})

const particleB = makeParticle({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: height }),
  direction: randomRange({ min: 0, max: Math.PI * 2 }),
  speed: randomRange({ min: 0, max: 50 }),
  radius: 20,
  friction: 0.9
})

const springLength = 100
const springStiffnessK = 0.01

registerRenderCycle(({ context, mousePosition }) => {
  clearCanvas()

  spring({
    particleA,
    particleB,
    stiffness: springStiffnessK,
    seperation: springLength
  })

  particleA.update()
  particleB.update()

  drawLineBetween({
    positionA: particleA.position,
    positionB: particleB.position,
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
})

const spring = ({ particleA, particleB, seperation = 0, stiffness = 0.2 }) => {
  const distanceVector = particleA.position.subtract(particleB.position)
  distanceVector.length -= seperation

  const springForceVector = distanceVector.multiply(stiffness)

  particleB.velocity.addTo(springForceVector)
  particleA.velocity.subtractFrom(springForceVector)
}

startRender()
