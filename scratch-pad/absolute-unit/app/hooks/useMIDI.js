import { useState, useEffect } from 'react'

export const useMIDI = () => {
  const [inputs, setInputs] = useState([])
  const [outputs, setOutputs] = useState([])
  const [isExclusive, setIsExclusive] = useState(false)

  const subscribers = new Set()

  const onPortStateChange = callback => {
    if (subscribers.has(callback) === false) {
      subscribers.add(callback)
    }
  }

  const request = () => {
    const handleStateChange = event => {
      for (const subscriber of subscribers) {
        subscriber(event)
      }
    }
    navigator.requestMIDIAccess().then(midiAccess => {
      midiAccess.addEventListener('statechange', handleStateChange)
      const { inputs, outputs, sysexEnabled } = midiAccess
      setInputs(inputs.values())
      setOutputs(outputs.values())
      setIsExclusive(sysexEnabled)
    })
  }

  useEffect(() => {
    return () => {
      subscribers.clear()
    }
  }, [])

  return {
    inputs,
    outputs,
    isExclusive,
    request,
    onPortStateChange
  }
}
