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

const particleCount = 300
const particlesArray = []

for (let i = 0; i < particleCount; i++) {
  setTimeout(() => {
    particlesArray.push(makeParticle({
      x: width / 2,
      y: height,
      speed: Math.random() * 8 + 5,
      direction: - Math.PI / 2 + (Math.random() * .2 - .1),
      radius: Math.random() * 10 + 2,
      gravity: 0.1
    }))
  }, 3000 * Math.random())
}

// initialize Stuff here.

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  particlesArray.forEach(particle => {

    particle.update()

    context.beginPath()
    context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false)
    context.fill()

    if (particle.position.y - particle.radius > height) {
      particle.position.x = width / 2
      particle.position.y = height
      particle.velocity.length = Math.random() * 8 + 5
      particle.velocity.angle = - Math.PI / 2 + (Math.random() * .2 - .1)
    }

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
