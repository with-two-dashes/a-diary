import { useState, useEffect } from 'react'

export const useDeviceLight = () => {
  const [value, setValue] = useState(0)

  const handleDeviceMotion = event => {
    setValue(event.value)
  }

  useEffect(() => {
    window.addEventListener('devicelight', handleDeviceMotion)
    return () => {
      window.removeEventListener('devicelight', handleDeviceMotion)
    }
  })

  return value
}
