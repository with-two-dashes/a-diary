import { useState, useEffect } from 'react'

export const useMediaDevices = () => {
  const [ mediaStream, setMediaStream ] = useState(null)
  const [ availableDevices, setAvailableDevices ] = useState([])

  const refreshDevices = () => {
    setAvailableDevices([])
    navigator.mediaDevices.enumerateDevices().then(devices => {
      setAvailableDevices(devices)
    })
  }

  const handleDeviceChangeEvent = () => {
    refreshDevices()
  }

  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChangeEvent)
    navigator.mediaDevices.enumerateDevices().then(devices => {
      setAvailableDevices(devices)
    })
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChangeEvent)
    }
  }, [])

  const request = (constraintsObject) => {
    navigator.mediaDevices.getUserMedia(constraintsObject)
      .then(mediaStream => {
        setMediaStream(mediaStream)
      })
  }

  return {
    availableDevices,
    mediaStream,
    request
  }
}
