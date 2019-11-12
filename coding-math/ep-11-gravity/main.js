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
const sun = makeParticle({ x: width / 2, y: height / 2 })
const planet = makeParticle({
  x: width / 2 + 200,
  y: height / 2,
  speed: 10,
  direction: Math.PI / 2
})

sun.mass = 40000

const render = ({ timestamp, resized, context, canvas }) => {
  // clearCanvas({ context })
  const { width, height } = canvas

  planet.gravatateTo(sun)
  planet.update()

  context.beginPath()
  context.fillStyle = `hsl(${planet.velocity.angle}rad, 50%, 50%)`
  context.arc(planet.position.x, planet.position.y, 5, 0, Math.PI * 2, false)
  context.fill()
  context.beginPath()
  context.fillStyle = 'yellow'
  context.arc(sun.position.x, sun.position.y, 20, 0, Math.PI * 2, false)
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
