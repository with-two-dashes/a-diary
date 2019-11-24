import { useState, useRef } from 'react'

export const useMIDI = () => {

  const midiAccessRef = useRef(null)

  const [hasAccess, setHasAccess] = useState(false)
  const [error, setError] = useState(false)

  const request = () => {
    setHasAccess(false)
    setError(error)
    midiAccessRef.current = null
    navigator.requestMIDIAccess().then(midiAccess => {
      setHasAccess(true)
      setError(null)
      midiAccessRef.current = midiAccess
    }).catch(error => {
      console.error('[useMIDI.js] MIDI Access Error', error)
      midiAccessRef.current = null
      setError(error)
    })
  }

  return {
    error,
    hasAccess,
    accessRef: midiAccessRef,
    request
  }
}
