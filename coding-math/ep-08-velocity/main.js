/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { makeParticle } from './makeParticle.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

const particleCount = 100

const particles = []

repeat(() => {

  const x = Math.random() * 800
  const y = Math.random() * 400

  const speed = Math.random() * 10

  const direction = (Math.PI / 6) * Math.random()

  particles.push(makeParticle({
    x,
    y,
    speed,
    direction
  }))
}, particleCount)

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  particles.forEach((particle) => {
    particle.update()
    context.beginPath()
    context.arc(particle.position.x, particle.position.y, 10, 0, Math.PI * 2, false);
    context.fill()
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

function repeat(callback, count) {
  for (let index = 0; index < count; index++) {
    callback(index, count)
  }
}
