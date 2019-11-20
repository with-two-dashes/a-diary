import { useState, useEffect } from 'react'
export const useCurrentPosition = () => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)
  const request = ({
    maximumAge = Infinity,
    timeout = 0,
    enableHighAccuracy = false
  }) => {
    const success = (position) => {
      setError(null)
      setPosition(position)
    }
    const error = (positionError) => {
      setPosition(null)
      setError(positionError)
    }
    navigator.geolocation.getCurrentPosition(success, error, { maximumAge, timeout, enableHighAccuracy })
  }
  return {
    request,
    position,
    error
  }
}

export const useWatchedPosition = ({
  maximumAge = Infinity,
  timeout = 0,
  enableHighAccuracy = false
}) => {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  const onSuccess = (position) => {
    setError(null)
    setPosition(position)
  }
  const onError = (positionError) => {
    setPosition(null)
    setError(positionError)
  }

  useEffect(() => {
    const positonWatcherID = navigator.watchPosition(onSuccess, onError, { maximumAge, timeout, enableHighAccuracy })
    return () => {
      navigator.clearWatch(positonWatcherID)
    }
  }, [])

  return {
    position,
    error
  }
}
