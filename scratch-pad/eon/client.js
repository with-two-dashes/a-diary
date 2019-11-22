import { getContext, setupRender, startRender, resizeCanvas } from './canvasEngineLibrary.js'
import moment from 'moment'
import { combinator } from 'postcss-selector-parser'

const { canvas } = getContext()
document.body.appendChild(canvas)

resizeCanvas()
const { width, height } = canvas
const centerX = width / 2
const centerY = height / 2

const convertToTimestamp = (input) => moment(input).valueOf()

const getNow = () => moment().valueOf()

const start = getNow()

const baseScale = 0.00125

let scale = 1.0

let leftOffset = 0
const futureTimeA = `2019-11-22 ${4 + 12}:30`
const futureTimeB = `2019-11-22 ${4 + 12}:10`

const times = [
  futureTimeA,
  futureTimeB
]

console.log({
  now: getNow(),
  a: convertToTimestamp(futureTimeA),
  b: convertToTimestamp(futureTimeB),
  AaL: getNow() - convertToTimestamp(futureTimeA),
  BbL: getNow() - convertToTimestamp(futureTimeB)
})

document.body.addEventListener('wheel', event => {
  scale += (event.deltaY / (1000 / scale))
  if (scale < 0) {
    scale = 0
  }
})

setupRender(({
  context,
  deltaTime,
  mouse,
  clearCanvas
}) => {
  const SCALE = (scale * baseScale)

  const { canvas: { width, height } } = context
  clearCanvas()
  const { x, oldX, isDown } = mouse

  if (isDown) {
    const vx = x - oldX
    leftOffset += vx
  }

  context.beginPath()
  context.strokeStyle = 'rgba(0,0,0,.15)'
  context.moveTo(0, centerY)
  context.lineTo(width, centerY)
  context.stroke()

  const now = getNow()
  const diff = (now - start) * SCALE
  context.beginPath()
  context.lineWidth = 2
  context.strokeStyle = 'rgba(255,0,0,.5)'
  context.moveTo(leftOffset, centerY)
  context.lineTo(leftOffset + diff, centerY)
  context.moveTo(leftOffset + diff, 0)
  context.lineTo(leftOffset + diff, height)
  context.stroke()

  for (const aTime of times) {
    const diff = (convertToTimestamp(aTime) - start) * SCALE
    context.beginPath()
    context.lineWidth = 1
    context.strokeStyle = 'black'
    context.arc(leftOffset + diff, centerY, 2000 * SCALE, 0, Math.PI * 2)
    context.fill()
    context.beginPath()
    context.moveTo(leftOffset + diff, 0)
    context.lineTo(leftOffset + diff, height)
    context.stroke()
  }
})

startRender()
