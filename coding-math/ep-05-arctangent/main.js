/* globals requestAnimationFrame */
import { canvasSizer } from '../common/canvasSizer.js'
import { clearCanvas } from '../common/clearCanvas.js'

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const context = canvas.getContext('2d')

let shouldContinue = true

let mouseX = 0
let mouseY = 0

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
})

document.addEventListener('mousedown', (event) => {
  arrows.push(
    makeArrow()
  )
})

const makeArrow = () => {
  const arrowXRando = Math.random()
  const arrowYRando = Math.random()

  return ({ context }) => {
    const { canvas } = context
    const { height, width } = canvas
    const arrowX = width * arrowXRando
    const arrowY = height * arrowYRando
    const distanceX = mouseX - arrowX
    const distanceY = mouseY - arrowY
    const angle = Math.atan2(distanceY, distanceX) // special sauce for this episode.
    context.save()

    context.translate(arrowX, arrowY)
    context.rotate(angle)

    context.beginPath()
    context.moveTo(20, 0)
    context.lineTo(-20, 0)
    context.moveTo(20, 0)
    context.lineTo(10, -10)
    context.moveTo(20, 0)
    context.lineTo(10, 10)
    context.stroke()

    context.restore()
  }
}

const arrows = [
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow(),
  makeArrow()
]

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  arrows.map(caller => { caller({ context }) })
}

const heartbeat = timestamp => {
  if (shouldContinue) {
    requestAnimationFrame(heartbeat)
    const { resized } = canvasSizer({ canvas })
    render({ timestamp, resized, context, canvas })
  }
}
requestAnimationFrame(heartbeat)
