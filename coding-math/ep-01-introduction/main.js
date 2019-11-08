/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

const drawRandomLines = ({ context, count = 100 }) => {
  const { canvas } = context
  const { width, height } = canvas
  for (let i = 0; i < count; i++) {
    context.beginPath()
    context.moveTo(Math.random() * width, Math.random() * height)
    context.lineTo(Math.random() * width, Math.random() * height)
    context.stroke()
  }
}

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  drawRandomLines({ context, count: 100 })
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
