import {
  registerRenderCycle,
  getCanvas,
  clearCanvas,
  startRender
} from './main.js'

import { drawCircle } from '../common/drawCircle.js'
import { randomRange } from '../common/randomRange.js'
import { cubicBezier } from '../common/cubicBezier.js'

const { width, height } = getCanvas()

const makeRandomPoint = () => ({
  x: randomRange({ min: 0, max: width }),
  y: randomRange({ min: 0, max: height })
})

const p0 = makeRandomPoint()
const p1 = makeRandomPoint()
const p2 = makeRandomPoint()
const p3 = makeRandomPoint()

let maxT = 0

registerRenderCycle(({ context, mousePosition }) => {
  clearCanvas()
  drawCircle({
    context,
    position: p0,
    radius: 4
  })
  drawCircle({
    context,
    position: p1,
    radius: 4
  })
  drawCircle({
    context,
    position: p2,
    radius: 4
  })
  drawCircle({
    context,
    position: p3,
    radius: 4
  })

  context.beginPath()
  context.moveTo(p0.x, p0.y)
  context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  context.stroke()

  for (var t = 0; t <= maxT; t += 0.01) {
    const { x, y } = cubicBezier({
      point0: p0,
      point1: p1,
      point2: p2,
      point3: p3,
      t
    })
    drawCircle({
      context,
      position: { x, y },
      radius: 20,
      fill: false
    })
  }

  maxT += 0.01
  if (maxT > 1) {
    maxT = 0
  }
})

startRender()
