import {
  registerRenderCycle,
  getCanvas,
  clearCanvas,
  startRender
} from './main.js'

import { drawCircle } from '../common/drawCircle.js'
import { makeParticle } from '../common/makeParticle2.js'
const { width, height } = getCanvas()

const sun = makeParticle({
  x: width / 2,
  y: height / 2,
  radius: 30,
  mass: 20000
})

const planet = makeParticle({
  x: width / 2 + 200,
  y: height / 2,
  speed: 10,
  radius: 10,
  direction: -Math.PI / 2
})

registerRenderCycle(({ context, mousePosition }) => {
  planet.gravatateTo(sun)
  planet.update()

  clearCanvas()
  drawCircle({
    context,
    position: sun,
    radius: sun.radius
  })

  drawCircle({
    context,
    position: planet,
    radius: planet.radius
  })
})

startRender()
