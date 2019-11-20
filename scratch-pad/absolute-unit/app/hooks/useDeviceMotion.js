import { useState, useEffect } from 'react'

export const useDeviceMotion = () => {
  const [acceleration, setAcceleration] = useState(0)
  const [accelerationIncludingGravity, setAccelerationIncludingGravity] = useState(0)
  const [rotationRate, setRotationRate] = useState(0)
  const [interval, setInterval] = useState(0)

  const handleDeviceMotion = event => {
    const {
      acceleration,
      accelerationIncludingGravity,
      rotationRate,
      interval
    } = event
    setAcceleration(acceleration)
    setAccelerationIncludingGravity(accelerationIncludingGravity)
    setRotationRate(rotationRate)
    setInterval(interval)
  }

  useEffect(() => {
    window.addEventListener('devicemotion', handleDeviceMotion)
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  })

  return {
    acceleration,
    accelerationIncludingGravity,
    rotationRate,
    interval
  }
}
