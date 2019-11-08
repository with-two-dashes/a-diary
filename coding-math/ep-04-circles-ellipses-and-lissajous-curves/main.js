/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

let angle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const centerX = width * 0.5
  const centerY = height * 0.5

  const xRadius = 400
  const yRadius = 200
  const speed = 0.1

  const x = centerX + Math.cos(angle) * xRadius
  const y = centerY + Math.sin(angle) * yRadius

  context.beginPath()
  context.moveTo(centerX, centerY)
  context.lineTo(x, y)
  context.stroke()

  context.beginPath()
  context.arc(x, y, 10, 0, Math.PI * 2, false)
  context.fill()

  angle += speed
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
