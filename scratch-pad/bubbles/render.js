import { drawCircle } from './utilities/drawCircle.js'

import { makeVerletParticle } from './physics/makeVerletParticle.js'
import { makeVerletConstraint } from './physics/makeVerletConstraint.js'
import { constrainWithin } from './physics/constrainWithin.js'
import { circleCollision } from './physics/circleCollision.js'

const mouseParticle = makeVerletParticle({
  radius: 10,
  x: 100,
  // gravity: 2,
  bounce: 0.9,
  speed: 10,
  friction: 0.99,
  direction: Math.PI * 2 * Math.random()
})

let worldParticles = []
const worldParticleCount = 50

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

let counter = 0
while (worldParticleCount > worldParticles.length) {
  worldParticles.push(makeVerletParticle({
    id: counter,
    x: Math.random() * 600 + 50,
    y: Math.random() * 300,
    speed: 50,
    direction: Math.random() * Math.PI * 2,
    radius: 20,
    gravity: 1,
    friction: 0.9999,
    // bounce: 0.9,
    fillStyle: colors[counter % colors.length - 1]
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
  mouse: { position, isMouseDown }
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

  for (const worldParticle of worldParticles) {
    worldParticle.update()

    const collisions = getParticlesCollidingWith(worldParticle)

    for (const collision of collisions) {
      worldParticle.collideWith(collision, context)
    }

    constrainWithin({
      minX: 0,
      minY: 0,
      maxX: width,
      maxY: height,
      particle: worldParticle
    })

    drawCircle({
      context,
      x: worldParticle.x,
      y: worldParticle.y,
      radius: worldParticle.radius,
      fillStyle: worldParticle.fillStyle
    })

    // const angle = Math.atan2(worldParticle.y - worldParticle.oldY, worldParticle.x - worldParticle.oldX)

    // const extension = 30

    // context.beginPath()
    // context.strokeStyle = 'white'
    // context.moveTo(worldParticle.x, worldParticle.y)
    // context.lineTo(worldParticle.x + Math.cos(angle) * extension, worldParticle.y + Math.sin(angle) * extension)
    // context.stroke()
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
