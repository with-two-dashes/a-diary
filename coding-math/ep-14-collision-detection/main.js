/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { circleCollision } from '../common/circleCollision.js'
import { circlePointCollision } from '../common/circlePointCollision.js'
import { rectanglePointCollision } from '../common/rectanglePointCollision.js'
import { rectangleRectangleCollision } from '../common/rectangleRectangleCollision.js'

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

const rect1 = {
  x: Math.random() * width,
  y: Math.random() * height,
  width: Math.random() * width,
  height: Math.random() * height
}

const rect2 = {
  x: Math.random() * width,
  y: Math.random() * height,
  width: Math.random() * width,
  height: Math.random() * height
}

canvas.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event
  circle1.x = clientX
  circle1.y = clientY
  rect2.x = clientX - rect2.width - 20
  rect2.y = clientY - rect2.height - 20
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

  const isInRect1 = rectanglePointCollision({
    rectangle: rect1,
    point: mousePoint
  })

  const rectsOverlap = rectangleRectangleCollision({
    rectangleA: rect1,
    rectangleB: rect2
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
  if (isInRect1) {
    context.fillStyle = 'green'
  }
  if (rectsOverlap) {
    context.fillStyle = 'purple'
  }
  context.arc(circle0.x, circle0.y, circle0.radius, 0, Math.PI * 2, false)
  context.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2, false)
  context.rect(rect1.x, rect1.y, rect1.width, rect1.height)
  context.rect(rect2.x, rect2.y, rect2.width, rect2.height)
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
