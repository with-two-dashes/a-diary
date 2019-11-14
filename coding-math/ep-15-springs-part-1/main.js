/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { makeParticle } from '../common/makeParticle.js'
import { makeVector } from '../common/makeVector.js'
import { drawCircle } from '../common/drawCircle.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const context = canvas.getContext('2d')

let shouldContinue = true

const { width, height } = canvas

// Begin Springs

const springPoint = makeVector({ x: width / 2, y: height / 2 })

const weight = makeParticle({
  x: width * Math.random(),
  y: height * Math.random(),
  radius: 20,
  friction: 0.95
})

const springConstantK = 0.1

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const distance = springPoint.subtract(weight.position)

  const springForce = distance.multiply(springConstantK)
  weight.velocity.addTo(springForce)

  weight.update()

  drawCircle({
    context,
    position: weight.position,
    radius: weight.radius
  })

  drawCircle({
    context,
    position: springPoint,
    radius: 4
  })

  context.beginPath()
  context.moveTo(springPoint.x, springPoint.y)
  context.lineTo(weight.position.x, weight.position.y)
  context.stroke()

}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
