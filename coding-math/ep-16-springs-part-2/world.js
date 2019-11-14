import {
  registerRenderCycle,
  // getCanvas,
  // getContext,
  clearCanvas,
  startRender
} from './main.js.js'

import { drawCircle } from '../common/drawCircle.js'
// import { makeParticle } from '../common/makeParticle.js'
// import { makeVector } from '../common/makeVector.js'

// const { width, height } = getCanvas()

registerRenderCycle(({ context, mousePosition }) => {
  clearCanvas()
  drawCircle({
    context,
    position: mousePosition,
    radius: 10
  })
})

startRender()
