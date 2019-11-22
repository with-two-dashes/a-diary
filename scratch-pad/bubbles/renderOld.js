import { drawCircle } from './utilities/drawCircle.js'

import { makeVerletParticle } from './physics/makeVerletParticle.js'
import { makeVerletConstraint } from './physics/makeVerletConstraint.js'
import { constrainWithin } from './physics/constrainWithin.js'
import { circleCollision } from './physics/circleCollision.js'

import { simulation } from './physics/simulation.js'

const PhysicsLoopCount = 5

const mouseParticle = makeVerletParticle({
  radius: 10,
  x: 100,
  bounce: 0.9,
  speed: 10,
  friction: 0.99,
  direction: Math.PI * 2 * Math.random()
})

let worldParticles = []
const worldParticleCount = 100

const colors = [
  'red',
  'gray',
  'yellow',
  'blue',
  'green',
  'purple',
  'violet',
  'cyan',
  'teal',
  'magenta'
]

const { makeParticle, step } = simulation({ globalGravityY: 0.4 })

let counter = 0
while (worldParticleCount > worldParticles.length) {
  worldParticles.push(makeParticle({
    x: Math.random() * 100,
    y: Math.random() * 100,
    radius: 5,
    fillStyle: colors[counter % colors.length],
    friction: 0.999999,
    mass: 1
  }))
  counter++
}

const getParticlesCollidingWith = (particle) => {
  return worldParticles.filter((worldParticle) => {
    return circleCollision({ circleA: particle, circleB: worldParticle })
  })
}

export const render = ({
  context,
  clearCanvas,
  mouse: { position, isMouseDown },
  deltaTime
}) => {
  const { canvas: { height, width } } = context
  clearCanvas()
  const { x, y, oldX, oldY } = position
  if (isMouseDown) {
    mouseParticle.x = x
    mouseParticle.y = y
    mouseParticle.oldX = oldX
    mouseParticle.oldY = oldY
  }

  mouseParticle.update()

  step(deltaTime)

  for (const particle of worldParticles) {
    particle.setWorldConstraints({
      left: 0,
      top: 0,
      bottom: height,
      right: width,
    })
    drawCircle({
      context,
      x: particle.x,
      y: particle.y,
      radius: particle.radius,
      fillStyle: particle.fillStyle
    })
  }

  constrainWithin({
    minX: 0,
    minY: 0,
    maxX: width,
    maxY: height,
    particle: mouseParticle
  })

  drawCircle({
    context,
    x: mouseParticle.x,
    y: mouseParticle.y,
    radius: mouseParticle.radius
  })
}
