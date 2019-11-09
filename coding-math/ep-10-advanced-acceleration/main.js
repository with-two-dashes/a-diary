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
  y: height / 2
})

const thrust = makeVector({ x: 0, y: 0 })

const drawShip = ({ canvas, context, angle }) => {
  const { width, height } = canvas
  context.beginPath()
  context.arc(ship.position.x, ship.position.y, 10, 0, Math.PI * 2, false)
  context.fill()
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
      thrust.y = -0.1
      break;
    case DOWN:
      thrust.y = 0.1
      break
    case LEFT:
      thrust.x = -0.1
      break
    case RIGHT:
      thrust.x = 0.1
      break
    default:
      break
  }
})

document.body.addEventListener('keyup', event => {
  const { LEFT, RIGHT, UP, DOWN } = keycodes
  switch (event.keyCode) {
    case UP:
      thrust.y = 0
      break;
    case DOWN:
      thrust.y = 0
      break
    case LEFT:
      thrust.x = 0
      break
    case RIGHT:
      thrust.x = 0
      break
    default:
      break
  }
})

let angle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  // clearCanvas({ context })
  const { width, height } = canvas

  ship.accelerate(thrust)
  ship.update()
  // animate stuff here
  drawShip({ context, canvas })
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
