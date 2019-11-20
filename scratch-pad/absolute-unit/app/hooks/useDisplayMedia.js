import { useState, useEffect } from 'react'

// This is part of the Screen Recording API

export const useDisplayMedia = (constraintsObject) => {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    if (constraintsObject) {
      setMediaStream(null)
      navigator.mediaDevices.getDisplayMedia(constraintsObject).then(mediaStream => {
        setMediaStream(mediaStream)
      })
    }
  }, [constraintsObject])

  return {
    mediaStream
  }
}
