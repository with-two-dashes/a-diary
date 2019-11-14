/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas as internalClearCanvas } from '../common/clearCanvas.js'
import { makeVector } from '../common/makeVector.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvasSizer({ canvas })

const { width, height } = canvas
const mousePosition = makeVector({ x: width / 2, y: height / 2 })

const context = canvas.getContext('2d')

const renderCycles = new Set()

let shouldContinue = true

export const getCanvas = () => canvas
export const getContext = () => context

export const startRender = () => {
  shouldContinue = true
  requestAnimationFrame(heartbeat)
  return () => {
    shouldContinue = false
  }
}

export const stopRender = () => {
  shouldContinue = false
}

export const clearCanvas = () => {
  internalClearCanvas({ context })
}

const render = (renderPayload) => {
  for (const renderCycle of renderCycles) {
    renderCycle(renderPayload)
  }
}

let lastTimestamp = 0

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    const deltaTime = timestamp - lastTimestamp
    render({
      mousePosition,
      lastTimestamp,
      timestamp,
      deltaTime,
      resized,
      context,
      canvas
    })
    lastTimestamp = timestamp
  } else {
    lastTimestamp = 0
  }
}

document.body.addEventListener('mousemove', (event) => {
  mousePosition.x = event.clientX
  mousePosition.y = event.clientY
})

export const registerRenderCycle = (callback) => {
  if (renderCycles.has(callback) === false) {
    renderCycles.add(callback)
  }
  return () => {
    renderCycles.delete(callback)
  }
}
