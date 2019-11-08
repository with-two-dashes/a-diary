/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

const numberOfObjects = 7

const radius = 200
const slice = (2 * Math.PI) / numberOfObjects

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const centerX = width / 2
  const centerY = height / 2

  for (let i = 0; i < numberOfObjects; i++) {
    const angle = i * slice
    const y = centerY + Math.sin(angle) * radius
    const x = centerX + Math.cos(angle) * radius

    context.beginPath()
    context.arc(x, y, 20, 0, Math.PI * 2, false)
    context.fill()
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
