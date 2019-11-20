/* globals BroadcastChannel */
import { useEffect, useState } from 'react'
export const useBroadcastChannel = (channelName, onMessage) => {
  const [activeBC, setActiveBC] = useState()
  const sendMessage = payload => {
    if (activeBC) {
      activeBC.postMessage(payload)
    }
  }
  useEffect(() => {
    const bc = new BroadcastChannel(channelName)
    bc.addEventListener('message', onMessage)
    setActiveBC(bc)
    return () => {
      bc.removeEventListener('message', onMessage)
      bc.close()
    }
  }, [channelName, onMessage])

  return {
    sendMessage
  }
}
