import React from 'react'
import './app.css'
import { Canvas } from './components/Canvas.js'
// import { randomRange } from './utilities/randomRange.js'
import { makeVerletParticle } from './physics/makeVerletParticle.js'
import { makeVerletConstraint } from './physics/makeVerletConstraint.js'
import { useGamepads } from './hooks/useGamepads.js'
import { getDistance } from './utilities/getDistance.js'
import { norm } from './utilities/norm.js'
import { lerp } from './utilities/lerp.js'
import { drawCircle } from './utilities/drawCircle.js'
import { useMIDI } from './hooks/useMIDI.js'

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
    context.strokeStyle = 'black'
    context.lineWidth = 1
    for (const constraint of verletConstraints) {
      const { pointA, pointB, isHidden } = constraint
      if (!isHidden) {
        context.moveTo(pointA.x, pointA.y)
        context.lineTo(pointB.x, pointB.y)
      }
    }
    context.stroke()
  }

  //#region[rgba(25,255,255,.5)]
  const renderAxesOld = ({ context, axes }) => {
    let axisIndex = 0
    let left = 100
    let top = 100
    const length = 100
    for (const axisValue of axes) {
      renderAxis({ axis: axisValue, index: axisIndex })
      axisIndex++
    }
    function renderAxis({ axis, index }) {
      let xValue = 0
      let yValue = 0
      const isX = index % 2 === 0
      const isY = !isX
      const groupIndex = Math.floor(index / 2)

      const length = 100

      const normalizedValue = norm({ min: 1, max: -1, value: axis })

      const totalWidth = length * 2

      const leftMargin = 64

      const leftOffset = 100 + (totalWidth * groupIndex) + (leftMargin * groupIndex)
      const topOffset = 200

      const rightLimit = leftOffset + 2 * length
      const bottomLimit = topOffset + 2 * length

      if (isX) {
        xValue = normalizedValue * length
      }
      if (isY) {
        yValue = normalizedValue * length
      }

      const x = leftOffset + xValue
      const y = topOffset + yValue

      let graphValueX = x
      let graphValueY = y

      if (isY) {
        graphValueX += length
      }
      if (isX) {
        graphValueY += length
      }

      // "A man's gotta know his limitations."
      //   -- a movie I haven't seen.
      //    -- researched: Dirty Harry, 
      //     -- The script line is different from the film line.
      // context.beginPath()
      // context.strokeStyle = 'lime'
      // context.moveTo(leftOffset, topOffset)
      // context.lineTo(leftOffset + length * 2, topOffset)
      // context.moveTo(leftOffset, topOffset)
      // context.lineTo(leftOffset, topOffset + length * 2)
      // context.stroke()

      // lets read something.
      context.beginPath()
      context.fillStyle = `black`
      context.fillText(`( ${axisIndex} )  ${axis}`, x + 10, y - 10)

      // our large dot
      context.beginPath()
      context.fill()
      context.arc(x, y, 10, 0, Math.PI * 2)
      context.fill()

      // the golden origin
      // I show both their furthest limits.
      // context.beginPath()
      // context.fillStyle = 'gold'
      // context.arc(x, topOffset, 3, 0, Math.PI * 2)
      // context.fill()

      if (isY) {
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(leftOffset, topOffset, 3, 0, Math.PI * 2)
        context.fill()
        // here we see the bounds of our reality
        context.beginPath()
        context.strokeStyle = 'lime'
        context.moveTo(leftOffset, topOffset)
        context.lineTo(leftOffset, topOffset + length * 2)
        context.stroke()
        // a horizontal line, to highlight your verticality,
        context.beginPath()
        context.strokeStyle = 'black'
        context.moveTo(x, y)
        context.lineTo(x + length * 2, y)
        context.stroke()

        // a small white dot at the center
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(x, topOffset + length, 3, 0, Math.PI * 2)
        context.fill()

        // the furthest of our lower reach
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(x, bottomLimit, 3, 0, Math.PI * 2)
        context.fill()
      }
      if (isX) {
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(leftOffset, topOffset, 3, 0, Math.PI * 2)
        context.fill()
        // I show you the bounds of your reality.
        context.beginPath()
        context.strokeStyle = 'lime'
        context.moveTo(leftOffset, topOffset)
        context.lineTo(leftOffset + length * 2, topOffset)
        context.stroke()
        // a vertical line, to show off your horizontal nature.
        context.beginPath()
        context.strokeStyle = 'black'
        context.moveTo(x, y)
        context.lineTo(x, y + length * 2)
        context.stroke()

        // a small white dot for the center
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(leftOffset + length, y, 3, 0, Math.PI * 2)
        context.fill()

        // the furthest right we can reach.
        context.beginPath()
        context.fillStyle = 'white'
        context.arc(rightLimit, y, 3, 0, Math.PI * 2)
        context.fill()
      }

      context.beginPath()
      context.strokeStyle = 'red'
      context.arc(graphValueX, graphValueY, 60, 0, Math.PI * 2, false)
      context.stroke()
      context.beginPath()
      context.arc(graphValueX, graphValueY, 10, 0, Math.PI * 2, false)
      context.stroke()
    }
  }
  //#endregion

  const renderAxes = ({ context, axes }) => {

    const offsetLeft = 200
    const offsetTop = 300

    const [
      rawLeftAnalogX,
      rawLeftAnalogY,
      rawRightAnalogX,
      rawRightAnalogY,
    ] = axes
    context.beginPath()

    const leftAnalogStick = {
      x: rawLeftAnalogX,
      y: rawLeftAnalogY
    }

    const rightAnalogStick = {
      x: rawRightAnalogX,
      y: rawRightAnalogY
    }

    const renderStick = ({ context, valueX, valueY, baseX, baseY, size, indexes }) => {

      const [xIndex, yIndex] = indexes

      const normalizedValueX = norm({ min: -1, max: 1, value: valueX })
      const normalizedValueY = norm({ min: -1, max: 1, value: valueY })

      const scaledSizeX = normalizedValueX * (size)
      const scaledSizeY = normalizedValueY * (size)

      const centerX = baseX + size / 2
      const centerY = baseY + size / 2

      context.beginPath()
      context.fillStyle = 'black'
      context.fillText(`[ ${xIndex} ] X: ${valueX}`, baseX - size / 2, baseY + (size * 2))
      context.fillText(`[ ${yIndex} ] Y: ${valueY}`, baseX - size / 2, baseY + (size * 2) + 16)

      context.beginPath()
      context.fillStyle = '#eee'
      context.strokeStyle = 'black'
      drawCircle({
        context,
        x: centerX,
        y: centerY,
        radius: size
      })
      context.stroke()
      context.fill()

      context.beginPath()
      context.fillStyle = 'rgba(0,0,0,.5)'
      drawCircle({
        context,
        x: baseX + scaledSizeX,
        y: baseY + scaledSizeY,
        radius: size / 2
      })
      context.fill()

      context.beginPath()
      context.strokeStyle = `white`
      context.lineWidth = `1.5`
      drawCircle({
        context,
        x: centerX,
        y: centerY,
        radius: size / 4
      })
      context.stroke()

      context.beginPath()
      context.strokeStyle = 'rgba(255,255,255,.25)'
      context.lineWidth = `1.5`
      drawCircle({
        context,
        x: centerX,
        y: centerY,
        radius: size / 2
      })
      context.stroke()

      context.beginPath()
      context.fillStyle = 'white'
      drawCircle({
        context,
        x: baseX + scaledSizeX,
        y: baseY + scaledSizeY,
        // x: baseX + size,
        // y: baseY + size,
        radius: size / 16
      })
      context.fill()
    }

    renderStick({
      context,
      size: 30,
      valueX: leftAnalogStick.x,
      valueY: leftAnalogStick.y,
      baseX: offsetLeft,
      baseY: offsetTop,
      indexes: [
        0, 1
      ]
    })

    renderStick({
      context,
      size: 30,
      valueX: rightAnalogStick.x,
      valueY: rightAnalogStick.y,
      baseX: offsetLeft + 200,
      baseY: offsetTop,
      indexes: [
        2, 3
      ]
    })
  } // end of renderAxes

  const renderButtons = ({ context, buttons }) => {

    let buttonIndex = 0
    for (const button of buttons) {
      renderButton({ context, button, index: buttonIndex })
      buttonIndex++
    }

    function renderButton({ button, index }) {
      // const { pressed, touched, value } = button
      const { pressed, touched } = button
      // the value us going to be 0 = off or 1 = on.
      // more testing needs to be done to see
      // if other values are possible.

      let isActive = pressed || touched

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
      if (isActive) {
        context.fillStyle = 'yellow'
      } else {
        context.fillStyle = 'black'
      }
      const { width: labelWidth } = context.measureText(label)
      context.fillText(label, x - (labelWidth / 2), y + 3)
      context.fill()
    }

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

      renderAxes({ context, axes })
      renderButtons({ context, buttons })

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

  const renderMIDI = ({ accessRef, inputStateRef, context }) => {

    const launchpadControllerRow = [
      104, 105, 106, 107, 108, 109, 110, 111
    ]

    const launchpadDecimalLayout = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
      [16, 17, 18, 19, 20, 21, 22, 23, 24],
      [32, 33, 34, 35, 36, 37, 38, 39, 40],
      [48, 49, 50, 51, 52, 53, 54, 55, 56],
      [64, 65, 66, 67, 68, 69, 70, 71, 72],
      [80, 81, 82, 83, 84, 85, 86, 87, 88],
      [96, 97, 98, 99, 100, 101, 102, 103, 104],
      [112, 113, 114, 115, 116, 117, 118, 119, 120]
    ]

    const renderInput = ({ input, index }) => {
      const {
        type, // "input"
        id, // a friendly device id, should be the same as inputKey
        name, // Seems to be the same as id?
        manufacturer, // string about the maker.
        version, // string. '0.0'
        state, // "connected" || "disconnected"? (disconected uncomfirmed)
        connection, // "closed" or  "open" (open uncomfirmed)
      } = input
      context.beginPath()
      context.fillText(`
      [${type}] ${state.toUpperCase()} -- ${name} (${manufacturer}) version: ${version}
      `, 50, 100 + 10 * index)
      context.fill()

      context.beginPath()
      context.fill()
    }

    const renderInputState = ({ state }) => {
      const left = 700
      const top = 300
      let noteOffset = 20

      const {
        notes,
        controllers
      } = state

      let controllerCounter = 0
      for (const controllerID of launchpadControllerRow) {
        const x = left + 10 * controllerCounter
        const y = top + 10
        if (controllers) {
          const value = controllers[controllerID]
          if (value > 0) {
            context.beginPath()
            context.fillStyle = 'black'
            drawCircle({
              x, y,
              context,
              radius: 4.9
            })
            context.fill()
          }
        }
        context.beginPath()
        context.lineWidth = 1
        context.strokeStyle = 'rgba(0,0,0,.2)'
        drawCircle({
          x, y,
          context,
          radius: 4.9
        })
        context.stroke()
        controllerCounter++
      }

      let rowCounter = 0
      for (const row of launchpadDecimalLayout) {
        let noteCounter = 0
        for (const noteID of row) {
          const x = left + 10 * noteCounter
          const y = top + 10 * rowCounter + noteOffset

          if (notes) {
            const value = notes[noteID]
            const strength = value / 127
            if (value > 0) {
              context.beginPath()
              context.fillStyle = `rgba(0,0,0,${strength})`
              drawCircle({
                x, y,
                context,
                radius: 4.9
              })
              context.fill()
            }
          }

          context.beginPath()
          context.lineWidth = 1
          context.strokeStyle = 'rgba(0,0,0,.2)'
          drawCircle({
            x, y,
            context,
            radius: 5
          })
          context.stroke()
          noteCounter++
        }
        rowCounter++
      }

      // for (const noteItem of noteStateItems) {
      //   const { note, velocity } = noteItem
      //   const x = 10 * counter + 700
      //   const y = 60 + (rowCounter * 10)
      //   if (velocity > 0) {
      //     context.beginPath()
      //     context.fillStyle = `rgba(0,0,0,${velocity / 127})`
      //     context.arc(x, y, 5, 0, Math.PI * 2, false)
      //     context.fill()
      //   } else {
      //     context.beginPath()
      //     context.strokeStyle = 'rgba(0,0,0,.4)'
      //     context.lineWidth = 1
      //     context.arc(x, y, 5, 0, Math.PI * 2, false)
      //     context.stroke()
      //   }
      //   // context.fillText(note, x - 5, y + 10)
      //   counter++

      //   if (counter >= 9) {
      //     counter = 0
      //     rowCounter++
      //   }
      // }
    }

    const renderOutput = ({ output, index }) => {
      const {
        type, // "output"
        id, // a friendly device id, should be the same as inputKey
        name, // Seems to be the same as id?
        manufacturer, // string about the maker.
        version, // string. '0.0'
        state, // "connected" || "disconnected"? (disconected uncomfirmed)
        connection, // "closed" or  "open" (open uncomfirmed)
      } = output
      context.beginPath()
      context.fillText(`
      [${type}] ${state.toUpperCase()} -- ${name} (${manufacturer}) version: ${version}
      `, 50, 180 + 10 * index)
      context.fill()
    }

    const renderInputs = inputs => {
      let counter = 0
      for (const key of inputs.keys()) {
        const input = inputs.get(key)
        const index = counter
        renderInput({ input, inputs, index, key })
        counter++
      }
    }

    const renderOutputs = outputs => {
      let counter = 0
      for (const key of outputs.keys()) {
        const output = outputs.get(key)
        const index = counter
        renderOutput({ output, outputs, index, key })
        counter++
      }
    }

    const midiAccessInstance = accessRef.current
    if (midiAccessInstance) {
      const { inputs, outputs } = midiAccessInstance
      renderInputs(inputs)
      renderOutputs(outputs)
      renderInputState({ state: inputStateRef.current })
    }

  } // end renderMIDI

  const { request, hasAccess, accessRef, inputState, inputStateRef } = useMIDI()

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
        testFn({ buttons }) {
          if (buttons[0].pressed) {
            return true
          } else {
            return false
          }
        },
        callback() {
          triggerClickHandler()
        }
      })
    }

    renderGamepads({ context, gamepads })
    renderMIDI({ accessRef, inputStateRef, context })
  }// anumate state

  const triggerMidiButtonClickHandler = () => {
    request()
  }

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
        <div>MIDI: {hasAccess ? 'ENABLED' : 'DISABLED'}</div>
        <pre>{
          JSON.stringify({
            hasAccess
          }, null, '  ')
        }</pre>
        <button onClick={triggerClickHandler}>Trigger</button>
        <button onClick={triggerMidiButtonClickHandler}>MIDI</button>
      </div>
    </div >
  )
}
