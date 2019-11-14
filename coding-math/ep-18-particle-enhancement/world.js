import {
  registerRenderCycle,
  getCanvas,
  // getContext,
  clearCanvas,
  startRender
} from './main.js'

import { drawCircle } from '../common/drawCircle.js'
import { makeParticle } from '../common/makeParticle2'
import { randomRange } from '../common/randomRange'

const { width, height } = getCanvas()

const sun1 = makeParticle({
  x: 300,
  y: 200,
  radius: 10,
  mass: 10000
})

const sun2 = makeParticle({
  x: 500,
  y: 400,
  radius: 20,
  mass: 20000
})

const emitter = {
  x: 100,
  y: 0
}

const particles = []

const particleCount = 400

for (let i = 0; i < particleCount; i++) {
  const p = makeParticle({
    x: emitter.x,
    y: emitter.y,
    direction: Math.PI / 2,
    speed: randomRange({ min: 7, max: 8 }),
    radius: randomRange({ min: 1, max: 7 })
  })
  p.addGravitation({ particle: sun1 })
  p.addGravitation({ particle: sun2 })
  particles.push(p)
}

registerRenderCycle(({ context, mousePosition }) => {
  clearCanvas()

  particles.forEach(particle => {
    particle.update()
    drawCircle({
      context,
      position: particle,
      radius: particle.radius
    })

    const resetParticle = () => {
      particle.x = emitter.x
      particle.y = emitter.y
      particle.speed = randomRange({ min: 7, max: 8 })
      particle.direction = Math.PI / 2
    }

    if (particle.x + particle.radius > width) {
      resetParticle()
    } else if (particle.x < -particle.radius) {
      resetParticle()
    }
    if (particle.y + particle.radius > height) {
      resetParticle()
    } else if (particle.y < -particle.radius) {
      resetParticle()
    }
  })

  drawCircle({
    context,
    position: sun1,
    radius: sun1.radius
  })
  drawCircle({
    context,
    position: sun2,
    radius: sun2.radius
  })
  // drawCircle({
  //   context,
  //   position: emitter,
  //   radius: 5
  // })
})

startRender()
