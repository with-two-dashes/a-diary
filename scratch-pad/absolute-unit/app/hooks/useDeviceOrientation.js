import { useState, useEffect } from 'react'
export const useDeviceOrientation = () => {
  const [ gama, setGamma ] = useState(0)
  const [ alpha, setAlpha ] = useState(0)
  const [ beta, setBeta ] = useState(0)
  const [ absolute, setAbsolute ] = useState(0)

  const handleDeviceOrientation = event => {
    const { gamma, alpha, beta, absolute } = event
    setGamma(gamma)
    setAlpha(alpha)
    setBeta(beta)
    setAbsolute(absolute)
  }

  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientation)
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [])

  return {
    alpha,
    beta,
    gama,
    absolute
  }
}
