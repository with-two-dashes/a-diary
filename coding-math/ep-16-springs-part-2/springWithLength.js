import {
  registerRenderCycle,
  getCanvas,
  clearCanvas,
  startRender
} from './main.js'

import { drawCircle } from '../common/drawCircle.js'
import { drawLineBetween } from '../common/drawLineBetween.js'
import { makeParticle } from '../common/makeParticle.js'
import { makeVector } from '../common/makeVector.js'

const { width, height } = getCanvas()

const springPoint = makeVector({ x: width / 2, y: height / 2 })
const weight = makeParticle({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: 30,
  friction: 0.95,
  gravity: 4.5
})

const springLength = 100
const springStiffnessK = 0.1

registerRenderCycle(({ context, mousePosition }) => {
  clearCanvas()

  springPoint.x = mousePosition.x
  springPoint.y = mousePosition.y

  const distance = springPoint.subtract(weight.position)
  distance.length -= springLength
  const springForce = distance.multiply(springStiffnessK)
  weight.velocity.addTo(springForce)
  weight.update()

  drawCircle({
    context,
    position: springPoint,
    radius: 8
  })

  drawLineBetween({
    positionA: springPoint,
    positionB: weight.position,
    context
  })

  drawCircle({
    context,
    position: weight.position,
    radius: weight.radius
  })
})

startRender()
