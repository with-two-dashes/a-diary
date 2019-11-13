/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { circleCollision } from '../common/circleCollision.js'
import { circlePointCollision } from '../common/circlePointCollision.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const context = canvas.getContext('2d')

let shouldContinue = true

const { width, height } = canvas

const mousePoint = {
  x: 0,
  y: 0
}

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
  mousePoint.x = clientX
  mousePoint.y = clientY
})

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const isCircleColliding = circleCollision({
    circleA: circle0,
    circleB: circle1
  })

  const isCirclePointColliding = circlePointCollision({
    circle: circle0,
    point: mousePoint
  })

  context.beginPath()
  if (isCircleColliding) {
    context.fillStyle = 'red'
  } else {
    context.fillStyle = 'blue'
  }
  if (isCirclePointColliding) {
    context.fillStyle = 'yellow'
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
