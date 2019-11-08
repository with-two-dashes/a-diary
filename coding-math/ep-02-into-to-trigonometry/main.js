/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'
import { bracketMaker } from '../common/bracketMaker.js'
import { computeRatio } from '../common/computeRatio.js'
import { getRadians } from '../common/conversions.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

const render = ({ timestamp, resized, context, canvas }) => {
  const { height, width } = canvas
  clearCanvas({ context })

  if (resized) {
    context.translate(0, height / 2) // puts y's zero value in the middle
    context.scale(1, -1) // flips the context
  }

  // context.beginPath()
  for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
    const x = angle * 200
    const y = Math.sin(angle) * 200
    context.fillRect(x, y, 5, 5)
  }
  // context.stroke()
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
