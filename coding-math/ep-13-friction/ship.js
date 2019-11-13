/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { makeParticle } from '../common/makeParticle.js'
import { makeVector } from '../common/makeVector.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const context = canvas.getContext('2d')

let shouldContinue = true

const { width, height } = canvas

// initialize Stuff here.

const ship = makeParticle({
  x: width / 2,
  y: height / 2,
  friction: 0.99
})

const thrust = makeVector({ x: 0, y: 0 })

let isThrusting = false
let isTurningLeft = false
let isTurningRight = false

const drawShip = ({ canvas, context, angle, isThrusting }) => {
  const { width, height } = canvas

  context.save()
  context.translate(ship.position.x, ship.position.y)
  context.rotate(angle)

  context.beginPath()
  context.moveTo(10, 0)
  context.lineTo(-10, -7)
  context.lineTo(-10, 7)
  context.lineTo(10, 0)
  context.stroke()
  context.fill()

  if (isThrusting) {
    context.beginPath()
    context.moveTo(-10, 0)
    context.lineTo(-18, 0)
    context.stroke()
  }

  context.restore()

  if (ship.position.x > width) {
    ship.position.x = 0
  } else if (ship.position.x < 0) {
    ship.position.x = width
  }
  if (ship.position.y > height) {
    ship.position.y = 0
  } else if (ship.position.y < 0) {
    ship.position.y = height
  }
}

const keycodes = {
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40
}

document.body.addEventListener('keydown', event => {
  const { LEFT, RIGHT, UP, DOWN } = keycodes
  switch (event.keyCode) {
    case UP:
      isThrusting = true
      break;
    case LEFT:
      isTurningLeft = true
      break
    case RIGHT:
      isTurningRight = true
      break
    default:
      break
  }
})

document.body.addEventListener('keyup', event => {
  const { LEFT, RIGHT, UP, DOWN } = keycodes
  switch (event.keyCode) {
    case UP:
      isThrusting = false
      break;
    case LEFT:
      isTurningLeft = false
      break
    case RIGHT:
      isTurningRight = false
      break
    default:
      break
  }
})

let angle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  if (isTurningLeft) {
    angle -= 0.05
  } else if (isTurningRight) {
    angle += 0.05
  }

  thrust.angle = angle

  if (isThrusting) {
    thrust.length = 0.2
  } else {
    thrust.length = 0
  }

  ship.accelerate(thrust)
  ship.update()
  // animate stuff here
  drawShip({ context, canvas, angle, isThrusting })
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
