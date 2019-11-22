/* globals requestAnimationFrame */
let isFrameByFrameMode = false
let shouldRender = true

const canvas = document.createElement('canvas')
resizeCanvas()
const context = canvas.getContext('2d')

const renderCallbacks = new Set()

let lastTimestamp = null

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
  mousePosition.x = clientX
  mousePosition.y = clientY
})

export function resizeCanvas () {
  const dpr = window.devicePixelRatio || 1.0
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

const heartbeat = timestamp => {
  if (isFrameByFrameMode === false && shouldRender) {
    requestAnimationFrame(heartbeat)
  }
  if (lastTimestamp != null) {
    const deltaTime = timestamp - lastTimestamp

    const clearCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
    for (const render of renderCallbacks.values()) {
      const resized = resizeCanvas()
      render({
        mouse: {
          ...mousePosition,
          isDown: isMouseDown
        },
        isMouseDown,
        resized,
        clearCanvas,
        canvas,
        context,
        deltaTime,
        timestamp
      })
    }
  }
  mousePosition.oldX = mousePosition.x
  mousePosition.oldY = mousePosition.y
  lastTimestamp = timestamp
}

export const getContext = () => context

export const setupRender = callback => {
  if (renderCallbacks.has(callback) === false) {
    if (typeof callback === 'function') {
      renderCallbacks.add(callback)
    }
  }
}

export const startRender = () => {
  shouldRender = true
  requestAnimationFrame(heartbeat)
}

export const stopRender = () => {
  shouldRender = false
}
