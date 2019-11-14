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

const particleC = makeParticle({
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
