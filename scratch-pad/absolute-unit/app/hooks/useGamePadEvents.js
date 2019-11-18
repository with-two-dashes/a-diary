import { useEffect } from 'react'

export const useGamePadEvents = () => {
  const connectSubscribers = new Set()
  const disconnectSubscribers = new Set()
  const buttonSubscribers = new Map()

  const handleGamepadConnected = event => {
    for (const subscriber of connectSubscribers.values()) {
      subscriber(event)
    }
  }
  const handleGamepadDisconnected = event => {
    for (const subscriber of disconnectSubscribers.values()) {
      subscriber(event)
    }
  }

  useEffect(() => {
    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)
    return () => {
      connectSubscribers.clear()
      disconnectSubscribers.clear()
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
    }
  }, [])

  return {
    onGamepadConnected(callback) {
      if (connectSubscribers.has(callback) === false) {
        connectSubscribers.add(callback)
      }
      return () => {
        if (connectSubscribers.has(callback)) {
          connectSubscribers.delete(callback)
        }
      }
    },
    onGamepadDisconnected(callback) {
      if (disconnectSubscribers.has(callback) === false) {
        disconnectSubscribers.add(callback)
      }
      return () => {
        if (disconnectSubscribers.has(callback)) {
          disconnectSubscribers.delete(callback)
        }
      }
    },
    getGamepads() {
      return navigator.getGamepads()
    },
    makeButtonLogicTestMaker(gamepadInstance) {
      return ({ testFn, callback }) => {
        if (testFn(gamepadInstance)) {
          callback()
        }
      }
    }
  }
}

