/* globals requestAnimationFrame */

import { render } from './render.js'

const isFrameByFrameMode = false

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

document.body.appendChild(canvas)

let isMouseDown = false
const mousePosition = { x: 0, y: 0, oldX: 0, oldY: 0 }

canvas.addEventListener('mousedown', event => {
  isMouseDown = true
  if (isFrameByFrameMode) {
    requestAnimationFrame(heartbeat)
  }
})

canvas.addEventListener('mouseup', event => {
  isMouseDown = false
})

canvas.addEventListener('mouseout', event => {
  isMouseDown = false
})

canvas.addEventListener('mousemove', event => {
  const { clientX, clientY } = event
  mousePosition.oldX = mousePosition.x
  mousePosition.oldY = mousePosition.y
  mousePosition.x = clientX
  mousePosition.y = clientY
})

const getDPR = () => window.devicePixelRatio || 1.0

const internalClearCanvas = ({ context }) => {
  const { canvas: { width, height } } = context
  context.clearRect(0, 0, width, height)
}

const sizeCanvas = ({ context }) => {
  const { canvas } = context
  const dpr = getDPR()
  const targetWidth = canvas.clientWidth * dpr
  const targetHeight = canvas.clientHeight * dpr
  let wasResized = false
  if (canvas.height !== targetHeight || canvas.width !== targetWidth) {
    canvas.height = targetHeight
    canvas.width = targetWidth
    wasResized = true
  }
  return wasResized
}

let lastTimestamp = 0

const heartbeat = timestamp => {
  const deltaTime = timestamp - lastTimestamp
  if (isFrameByFrameMode === false) {
    requestAnimationFrame(heartbeat)
  }
  const clearCanvas = () => internalClearCanvas({ context })
  const resized = sizeCanvas({ context })
  const mouse = {
    isMouseDown,
    position: mousePosition
  }
  render({
    mouse,
    clearCanvas,
    timestamp,
    resized,
    context,
    canvas,
    deltaTime,
  })
  lastTimestamp = timestamp
}

requestAnimationFrame(heartbeat)
