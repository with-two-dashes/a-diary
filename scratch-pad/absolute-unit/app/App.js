import React from 'react'
import './app.css'
import { Canvas } from './components/Canvas.js'
// import { randomRange } from './utilities/randomRange.js'
import { makeVerletParticle } from './physics/makeVerletParticle.js'
import { makeVerletConstraint } from './physics/makeVerletConstraint.js'
import { useGamepads } from './hooks/useGamepads.js'
import { getDistance } from './utilities/getDistance.js'

const physicsAccuracyLoopCount = 10

const makeSimplePoint = ({ x, y, oldX: anOldY, oldY: anOldX, ...rest }) => {
  const gravity = 0.5
  const friction = 0.98
  const bounce = 0.9
  const radius = 0

  const oldX = anOldX || x
  const oldY = anOldY || y

  return makeVerletParticle({
    x,
    y,
    oldX,
    oldY,
    gravity,
    friction,
    bounce,
    radius,
    ...rest
  })
}

const makeSimpleConstraint = ({ pointA, pointB, length: aLength, ...rest }) => {
  const length = aLength || getDistance({ pointA, pointB })
  return makeVerletConstraint({
    pointA,
    pointB,
    length,
    ...rest
  })
}

const vo = 100
const ho = 100

const pointA = makeSimplePoint({
  x: 100 + vo,
  y: 100 + ho,
  speed: -50,
  direction: Math.PI / 2
})

const pointB = makeSimplePoint({
  x: 200 + vo,
  y: 100 + ho,
  isPinned: false
})

const pointC = makeSimplePoint({
  x: 200 + vo,
  y: 200 + ho
})

const pointD = makeSimplePoint({
  x: 100 + vo,
  y: 200 + ho
})

const verletParticles = [
  pointA,
  pointB,
  pointC,
  pointD
]

const verletConstraints = [
  makeSimpleConstraint({
    pointA: pointA,
    pointB: pointB
  }),
  makeSimpleConstraint({
    pointA: pointB,
    pointB: pointC
  }),
  makeSimpleConstraint({
    pointA: pointC,
    pointB: pointD
  }),
  makeSimpleConstraint({
    pointA: pointD,
    pointB: pointA
  }),
  makeSimpleConstraint({
    pointA: pointC,
    pointB: pointA,
    stiffness: 0.01,
    isHidden: false
  }),
  makeSimpleConstraint({
    pointA: pointB,
    pointB: pointD,
    stiffness: 0.01,
    isHidden: false
  })
]

export const App = () => {
  const triggerClickHandler = () => {
    pointA.vy += 30
  }

  const constrainPoints = ({ context }) => {
    const { canvas: { width, height } } = context
    for (const particle of verletParticles) {
      const { vx, vy, isPinned } = particle
      if (!isPinned) {
        if (particle.x + particle.radius > width) {
          particle.x = width - particle.radius
          particle.vx += vx * particle.bounce
        } else if (particle.x - particle.radius < 0) {
          particle.x = particle.radius
          particle.vx += vx * particle.bounce
        }
        if (particle.y + particle.radius > height) {
          particle.y = height - particle.radius
          particle.vy += vy * particle.bounce
        } else if (particle.y - particle.radius < 0) {
          particle.y = particle.radius
          particle.vy += vy * particle.bounce
        }
      }
    }
  }

  const updateVerletPoints = () => {
    for (const particle of verletParticles) {
      particle.update()
    }
  }

  const updateVerletSticks = () => {
    for (const stick of verletConstraints) {
      stick.update()
    }
  }

  // const renderVerletPoints = ({ context }) => {
  //   context.beginPath()
  //   for (const particle of verletParticles) {
  //     context.arc(particle.x, particle.y, particle.radius, Math.PI * 2, false)
  //   }
  //   context.fill()
  // }

  const renderVerletSticks = ({ context }) => {
    context.beginPath()
    for (const constraint of verletConstraints) {
      const { pointA, pointB, isHidden } = constraint
      if (!isHidden) {
        context.moveTo(pointA.x, pointA.y)
        context.lineTo(pointB.x, pointB.y)
      }
    }
    context.stroke()
  }

  const renderAxis = ({ context, axis, index }) => {
    const isX = index % 2 === 0
    const isY = index % 2 === 1
    const x = 30 * (index + 1)
    const y = 80
    if (isX) {
      context.beginPath()
      context.fillStyle = `rgba(0,0,0,${Math.abs(axis)})`
      context.arc(x, y, 10, 0, Math.PI * 2, false)
      context.fill()
      context.stroke()
    }
    if (isY) {
      context.beginPath()
      context.fillStyle = `rgba(0,0,0,${Math.abs(axis)})`
      context.arc(x, y, 10, 0, Math.PI * 2, false)
      context.fill()
      context.stroke()
    }
    context.beginPath()
    context.fillStyle = 'black'
    const verticalOffset = 2
    if (isX) {
      const { width: labelWidth } = context.measureText('x')
      context.fillText('x', x - (labelWidth / 2), y + verticalOffset)
    }
    if (isY) {
      const { width: labelWidth } = context.measureText('y')
      context.fillText('y', x - (labelWidth / 2), y + verticalOffset)
    }
    context.fill()
  }

  const renderButton = ({ context, button, index }) => {
    // const { pressed, touched, value } = button
    const { pressed, touched } = button
    // the value us going to be 0 = off or 1 = on.
    // more testing needs to be done to see
    // if other values are possible.
    const label = `${index}`
    context.beginPath()
    const x = 30 * (index + 1)
    const y = 30
    if (pressed) {
      context.fillStyle = 'red'
    } else if (touched) {
      context.fillStyle = 'green'
    } else {
      context.fillStyle = 'rgba(0,0,0,.125)'
    }
    context.arc(x, y, 10, 0, Math.PI * 2, false)
    context.fill()

    context.beginPath()
    context.fillStyle = 'black'
    const { width: labelWidth } = context.measureText(label)
    context.fillText(label, x - (labelWidth / 2), y + 3)
    context.fill()
  }

  const renderGamepad = ({ context, gamepad, index }) => {
    if (gamepad) {
      // const {
      //   axes,
      //   buttons,
      //   connected,
      //   displayId,
      //   hand,
      //   hapticActuators,
      //   id,
      //   index,
      //   mapping,
      //   pose,
      //   timestamp
      // } = gamepad
      const {
        axes,
        buttons,
        id
      } = gamepad

      context.beginPath()
      context.fillStyle = 'black'
      context.fillText(id, 20, 10)
      context.fill()

      let axisIndex = 0
      for (const axis of axes) {
        renderAxis({ context, axis, index: axisIndex })
        axisIndex++
      }

      let buttonIndex = 0
      for (const button of buttons) {
        renderButton({ context, button, index: buttonIndex })
        buttonIndex++
      }
    } else {
      console.log('No Gamepad:', index)
    }
  }

  let gamepadIndex = 0
  const renderGamepads = ({ context, gamepads }) => {
    for (const gamepad of gamepads) {
      renderGamepad({ context, gamepad, index: gamepadIndex })
      gamepadIndex++
    }
  }

  const animate = ({ context, deltaTime, canvas, clearCanvas, resized, isFirstRender }) => {
    clearCanvas()
    updateVerletPoints()
    for (let i = 0; i < physicsAccuracyLoopCount; i++) {
      updateVerletSticks()
      constrainPoints({ context })
    }
    // renderVerletPoints({ context })
    renderVerletSticks({ context })

    const gamepads = getGamepads()

    for (const gamepad of gamepads) {
      const whenLogic = makeButtonLogicTestMaker(gamepad)

      whenLogic({
        testFn ({ buttons }) {
          if (buttons[0].pressed) {
            return true
          } else {
            return false
          }
        },
        callback () {
          triggerClickHandler()
        }
      })
    }

    renderGamepads({ context, gamepads })
  }// anumate state

  const {
    onGamepadConnected,
    onGamepadDisconnected,
    getGamepads,
    makeButtonLogicTestMaker
  } = useGamepads()

  onGamepadConnected(event => {
    console.log('GamepadDetected', event)
  })

  onGamepadDisconnected(event => {
    console.log('GamepadDisconnected', event)
  })

  return (
    <div className='app'>
      <div className='leftColumn'>
        <Canvas onRender={animate} />
      </div>
      <div className='rightColumn'>
        <div>Right Column</div>
        <button onClick={triggerClickHandler}>Trigger</button>
      </div>
    </div >
  )
}
