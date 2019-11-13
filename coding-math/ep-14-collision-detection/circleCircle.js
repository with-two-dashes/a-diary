/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { circleCollision } from '../common/circleCollision.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const context = canvas.getContext('2d')

let shouldContinue = true

const { width, height } = canvas

// initialize Stuff here.
const circle0 = {
  x: Math.random() * width,
  y: Math.random() * height,
  radius: 50 + Math.random() * 100
}

const circle1 = {
  x: Math.random() * width,
  y: Math.random() * height,
  radius: 50 + Math.random() * 100
}

canvas.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event
  circle1.x = clientX
  circle1.y = clientY
})

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const isColliding = circleCollision({
    circleA: circle0,
    circleB: circle1
  })

  context.beginPath()
  if (isColliding) {
    context.fillStyle = 'red'
  } else {
    context.fillStyle = 'blue'
  }
  context.arc(circle0.x, circle0.y, circle0.radius, 0, Math.PI * 2, false)
  context.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2, false)
  context.fill()

  // animate stuff here
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
