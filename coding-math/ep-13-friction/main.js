/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { makeVector } from '../common/makeVector.js'
import { makeParticle } from '../common/makeParticle.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const context = canvas.getContext('2d')

let shouldContinue = true

const { width, height } = canvas

// initialize Stuff here.

const particle = makeParticle({
  x: width / 2,
  y: height / 2,
  direction: Math.PI * Math.random() * 2,
  speed: 10,
  radius: 10
})

const friction = makeVector({
  x: 0.15,
  y: 0
})

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  friction.angle = particle.velocity.angle
  if (particle.velocity.length > friction.length) {
    particle.velocity.subtractFrom(friction)
  } else {
    particle.velocity.length = 0
  }
  particle.update()

  context.beginPath()
  context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false)
  context.fill()
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
