import {
  registerRenderCycle,
  getCanvas,
  clearCanvas,
  startRender
} from './main.js'

import { drawCircle } from '../common/drawCircle.js'
import { drawLineBetween } from '../common/drawLineBetween.js'
import { makeParticle } from '../common/makeParticle2.js'
const { width, height } = getCanvas()

const springLength = 100
const springStiffnessK = 0.2

const springPoint = {
  x: width / 2,
  y: height / 2,
  radius: 10
}

const weight = makeParticle({
  x: width * Math.random(),
  y: height * Math.random(),
  friction: 0.95,
  radius: 30
})

registerRenderCycle(({ context, mousePosition }) => {
  springPoint.x = mousePosition.x
  springPoint.y = mousePosition.y

  weight.springTo({
    particle: springPoint,
    stiffness: springStiffnessK,
    length: springLength
  })

  weight.update()

  clearCanvas()

  drawLineBetween({
    context,
    positionA: springPoint,
    positionB: weight
  })

  drawCircle({
    context,
    position: springPoint,
    radius: springPoint.radius
  })

  drawCircle({
    context,
    position: weight,
    radius: weight.radius
  })
})

startRender()
