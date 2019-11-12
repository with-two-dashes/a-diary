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

const particle = makeParticle({
  x: width / 2,
  y: height / 2,
  direction: -Math.PI / 2 * Math.random(),
  speed: 10,
  gravity: 0.4,
  radius: 10,
  bounce: -.94
})

// initialize Stuff here.

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas
  particle.update()

  context.beginPath()
  context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false)
  context.fill()

  if (particle.position.x + particle.radius > width) {
    particle.position.x = width - particle.radius
    particle.velocity.x *= particle.bounce
  } else if (particle.position.x - particle.radius < 0) {
    particle.position.x = particle.radius
    particle.velocity.x *= particle.bounce
  }

  if (particle.position.y + particle.radius > height) {
    particle.position.y = height - particle.radius
    particle.velocity.y *= particle.bounce
  } else if (particle.position.y - particle.radius < 0) {
    particle.position.y = particle.radius
    particle.velocity.y *= particle.bounce
  }
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
