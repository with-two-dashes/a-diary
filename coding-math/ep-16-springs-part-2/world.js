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

const { width } = getCanvas()

const gravity = 2
const friction = 0.8
const radius = 20

const springLength = 200
const springStiffnessK = 0.2

const makeCustomParticle = () => makeParticle({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: 0 }),
  direction: randomRange({ min: 0, max: Math.PI * 2 }),
  speed: randomRange({ min: 0, max: 50 }),
  radius,
  friction,
  gravity
})

const particleA = makeCustomParticle()
const particleB = makeCustomParticle()
const particleC = makeCustomParticle()

const particles = [
  particleA,
  particleB,
  particleC
]

const springs = [
  makeSpring({
    particleA,
    particleB,
    stiffness: springStiffnessK,
    seperation: springLength
  }),
  makeSpring({
    particleA: particleA,
    particleB: particleC,
    stiffness: springStiffnessK,
    seperation: springLength
  }),
  makeSpring({
    particleA: particleC,
    particleB: particleB,
    stiffness: springStiffnessK,
    seperation: springLength
  })
]

registerRenderCycle(({ context, canvas, mousePosition }) => {
  clearCanvas()

  const { height } = canvas

  particles.map(({
    update,
    position,
    radius
  }) => {
    update()

    if (position.y + radius > height) {
      position.y = height - radius
    }

    drawCircle({
      context,
      position,
      radius
    })
  })

  springs.map(({
    update,
    particleA,
    particleB
  }) => {
    update()
    drawLineBetween({
      positionA: particleA.position,
      positionB: particleB.position,
      context
    })
  })
})

function makeSpring ({ particleA, particleB, seperation = 0, stiffness = 0.2 }) {
  const update = () => {
    const distanceVector = particleA.position.subtract(particleB.position)
    distanceVector.length -= seperation

    const springForceVector = distanceVector.multiply(stiffness)

    particleB.velocity.addTo(springForceVector)
    particleA.velocity.subtractFrom(springForceVector)
  }

  return {
    particleA,
    particleB,
    update
  }
}

startRender()
