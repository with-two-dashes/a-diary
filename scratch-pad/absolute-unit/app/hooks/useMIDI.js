import { useState, useRef } from 'react'

export const useMIDI = () => {

  const internalInputs = new Map()
  const internalOutputs = new Map()

  const globalInputListeners = new Map()
  const globalOutputListeners = new Map()

  const midiAccessRef = useRef(null)

  const inputStateRef = useRef({
    notes: {}
  })

  const [inputState, updateInputState] = useState({})
  const [access, setAccess] = useState(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [error, setError] = useState(false)

  const emitLaunchpadNote = ({ isOn, key, velocity }) => {
    // console.log({ isOn, key, velocity })

    const rectifyState = ({ existing }) => {
      const {
        notes,
        ...restOfExisting
      } = existing
      const newNotes = {
        ...notes,
        [key]: velocity
      }
      return {
        ...restOfExisting,
        notes: newNotes,
      }
    }

    inputStateRef.current = rectifyState({
      existing: inputStateRef.current
    })
    updateInputState(existingState => {
      return rectifyState({ existing: existingState })
    })
  }

  const emitLaunchpadControllerData = ({ controller, data }) => {

    const rectifyState = ({ existing }) => {
      const {
        controllers,
        ...restOfExisting
      } = existing
      const newControllers = {
        ...controllers,
        [controller]: data
      }
      return {
        ...restOfExisting,
        controllers: newControllers,
      }
    }

    inputStateRef.current = rectifyState({
      existing: inputStateRef.current
    })
    updateInputState(existingState => {
      return rectifyState({ existing: existingState })
    })
  }

  const handleLaunchpadData = ({ data }) => {
    const [A, B, C] = data
    const isNoteMessage = A === 128 || A === 144
    const isControllerChange = A === 176
    if (isNoteMessage) {
      const isOn = A === 144
      const key = B
      const velocity = C
      emitLaunchpadNote({ isOn, key, velocity })
    } else if (isControllerChange) {
      const controller = B
      const data = C
      emitLaunchpadControllerData({ controller, data })
    }
  }

  const emitFromInput = ({ event, key }) => {
    const { data, receivedTime, timeStamp } = event
    const importantBits = {
      key,
      data,
      receivedTime,
      timeStamp,
      event
    }
    if (key === 'Launchpad Mini') {
      handleLaunchpadData({ key, data, receivedTime, timeStamp, event })
    } else {
      console.log('Unhandled Input Key', key)
    }
    const input = internalInputs.get(key)
    if (globalInputListeners.has(input)) {
      const listeners = globalInputListeners.get(input)
      for (const listener of listeners) {
        listener(importantBits)
      }
    }
  }

  const registerIO = ({ inputs, outputs }) => {
    internalInputs.clear()
    for (const key of inputs.keys()) {
      const input = inputs.get(key)
      input.onmidimessage = (event) => {
        emitFromInput({ event, key })
      }
      console.log('MIDI INPUT', input)
      internalInputs.set(key, input)
    }
    for (const key of outputs.keys()) {
      const output = inputs.get(key)
      internalOutputs.set(key, output)
    }
  }

  const request = () => {
    setHasAccess(false)
    setError(error)
    midiAccessRef.current = null
    navigator.requestMIDIAccess().then(midiAccess => {
      setHasAccess(true)
      setAccess(midiAccess)
      setError(null)
      registerIO(midiAccess)
      midiAccessRef.current = midiAccess
    }).catch(error => {
      console.error('[useMIDI.js] MIDI Access Error', error)
      midiAccessRef.current = null
      setError(error)
      setAccess(null)
    })
  }

  const subscribeToInputMIDI = ({ key, callback }) => {
    const input = internalInputs.get(key)
    if (globalInputListeners.has(input) === false) {
      const listenerSet = new Set()
      listenerSet.add(callback)
      globalInputListeners.set(input, listenerSet)
    } else {
      const listenerSet = globalInputListeners.get(input)
      const newListenerSet = new Set([...listenerSet.values(), callback])
      globalInputListeners.set(input, newListenerSet)
    }
  }

  return {
    inputState,
    inputStateRef,
    error,
    hasAccess,
    access,
    accessRef: midiAccessRef,
    subscribeToInputMIDI,
    request
  }
}
