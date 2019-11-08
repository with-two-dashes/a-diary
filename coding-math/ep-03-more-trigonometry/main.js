/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

const render = ({ timestamp, resized, context, canvas }) => {
  const { height } = canvas
  clearCanvas({ context })

  if (resized) {
    context.translate(0, height / 2) // puts y's zero value in the middle
    context.scale(1, -1) // flips the context
  }

  for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
    const x = angle * 200
    const y = Math.cos(angle) * 200
    context.fillRect(x, y, 5, 5)
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
