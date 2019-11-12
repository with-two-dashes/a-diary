/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { makeParticle } from '../common/makeParticle.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const context = canvas.getContext('2d')

let shouldContinue = true

const { width, height } = canvas

const p = makeParticle({
  x: width / 2,
  y: height / 2,
  speed: 4,
  direction: Math.random() * Math.PI * 2,
  radius: 10,
})

// initialize Stuff here.

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  p.update()

  context.beginPath()
  context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false)
  context.fill()

  if (p.position.x > width) {
    p.position.x = 0
  } else if (p.position.x < 0) {
    p.position.x = width
  }

  if (p.position.y > height) {
    p.position.y = 0
  } else if (p.position.y < 0) {
    p.position.y = height
  }
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
