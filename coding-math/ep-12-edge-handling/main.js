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

const particleCount = 100
let particlesArray = []

for (let i = 0; i < particleCount; i++) {
  particlesArray.push(makeParticle({
    x: width / 2,
    y: height / 2,
    speed: 10 * Math.random() + 4,
    direction: Math.random() * Math.PI * 2,
    radius: Math.random() * 20,
  }))
}

// initialize Stuff here.

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  particlesArray = particlesArray.filter(p => {

    p.update()

    context.beginPath()
    context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false)
    context.fill()

    if (p.position.x - p.radius > width) {
      return false
    } else if (p.position.x < -p.radius) {
      return false
    }

    if (p.position.y - p.radius > height) {
      return false
    } else if (p.position.y < -p.radius) {
      return false
    }

    return true
  })
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
