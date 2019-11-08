/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

let angle = 0

const oscilationMaker = ({ base, delta }) => {
  // the base is the middle value,
  // the delta is the ammount of change, positive and negative
  let angleValue = 0
  return ({ speed }) => {
    angleValue += speed
    return base + Math.sin(angleValue) * delta
  }
}

const oscilateAlpha = oscilationMaker({ base: 0.5, delta: 0.125 })

const render = ({ timestamp, resized, context, canvas }) => {
  const { height, width } = canvas
  clearCanvas({ context })

  if (resized) {
    // context.translate(0, height / 2) // puts y's zero value in the middle
    // context.scale(1, -1) // flips the context
  }

  const centerY = height * 0.5
  const centerX = width * 0.5
  // const changeAmmount = 0.5
  // const middleValue = 0.5

  const speed = 0.2

  // const alpha = middleValue + (Math.sin(angle) * changeAmmount)

  context.beginPath()
  context.fillStyle = `rgba(0,0,0,${oscilateAlpha({ speed })})`
  context.arc(centerX, centerY, 50, 0, Math.PI * 2, false)
  context.fill()

  // angle += speed
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
