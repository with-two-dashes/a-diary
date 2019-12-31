const SerialPort = require('serialport')
const { createInterface } = require('readline')
const uuid = require('uuid')

const makeProximityDetector = ({ path }) => {
  let internalProximity = 0
  let internalMode = null // we won't know till we recieve data

  const proximitySubscribers = new Set()
  const gestureSubscribers = new Set()

  const waitingRequests = new Map()

  const baudRate = 115200

  const serialPort = new SerialPort(path, {
    baudRate
  })

  const lineReader = createInterface({
    input: serialPort
  })

  const sendDataToDevice = requestObject => new Promise((resolve, reject) => {
    const { id: requestID } = requestObject
    waitingRequests.set(requestID, { requestObject, requestID, resolve, reject })
    const formattedPayload = JSON.stringify(requestObject) + '\r\n'
    const payload = Buffer.from(formattedPayload)
    serialPort.write(payload)
  })

  const handleResponseFromDevice = responseObject => {
    const { id, error, value } = responseObject
    if (waitingRequests.has(id)) {
      const waitingRequest = waitingRequests.get(id)
      waitingRequests.delete(id)
      const { resolve, reject } = waitingRequest
      if (error) {
        reject(error)
      } else {
        resolve(value)
      }
    }
  }

  const connect = () => new Promise((resolve, reject) => {
    serialPort.on('open', error => {
      if (error) {
        reject(error)
      } else {
        lineReader.on('line', d => {
          try {
            const data = JSON.parse(d.toString())
            const { type, name, detail } = data
            if (type === 'event') {
              if (name === 'proximity-data') {
                if (internalMode !== 'proximity') {
                  internalMode = 'proximity'
                }
                broadcastProximity(detail.proximity)
              } else if (name === 'gesture') {
                if (internalMode !== 'gesture') {
                  internalMode = 'gesture'
                }
                broadcastGesture(detail.type)
              } else if (name === 'error') {
                console.error(data)
              } else {
                console.log('unexpected name:', name)
              }
            } else if (type === 'rpc-response') {
              handleResponseFromDevice(data)
            } else {
              console.error('unexpected', data)
            }
          } catch (e) {
            throw e
          }
        })
        resolve()
      }
    })
  })

  const broadcastProximity = value => {
    const diff = internalProximity - value
    if (Math.abs(diff) > 1) {
      if (internalProximity !== value) {
        internalProximity = value
        for (const subscriber of proximitySubscribers) {
          subscriber(value)
        }
      }
    }
  }

  const broadcastGesture = value => {
    for (const subscriber of gestureSubscribers) {
      subscriber(value)
    }
  }

  const subscribeToProximityUpdates = callback => {
    if (proximitySubscribers.has(callback) === false) {
      proximitySubscribers.add(callback)
    }
    return () => {
      if (proximitySubscribers.has(callback)) {
        proximitySubscribers.delete(callback)
      }
    }
  }

  const subscribeToGestureUpdates = callback => {
    if (gestureSubscribers.has(callback) === false) {
      gestureSubscribers.add(callback)
    }
    return () => {
      if (gestureSubscribers.has(callback)) {
        gestureSubscribers.delete(callback)
      }
    }
  }

  const setToGestureMode = () => {
    console.log('setting to Gesture Mode!')
    const id = uuid.v4()
    const mode = 'gesture'
    const method = 'set-mode'
    const params = [{ mode }]
    const payload = {
      type: 'rpc-request',
      id,
      method,
      params
    }
    return sendDataToDevice(payload)
  }

  const setToProximityMode = () => {
    console.log('setting to Proximity Mode!')
    const id = uuid.v4()
    const mode = 'proximity'
    const method = 'set-mode'
    const params = [{ mode }]
    const payload = {
      type: 'rpc-request',
      id,
      method,
      params
    }
    return sendDataToDevice(payload)
  }

  const setPollingInterval = interval => {
    const hardcodedMin = 50 // will error if lower than this.
    const softCodedMax = 2147000000 // actual max is untested, but this equates to about a month and is valid.
    const normalizedValue = Math.min(softCodedMax, Math.max(hardcodedMin, interval))
    if (normalizedValue !== interval) {
      if (normalizedValue === hardcodedMin) {
        console.error('Interval provided is too low, setting to lowest acceptable interval.')
      } else {
        console.info('Interval provided is too high, see code comments for details. Setting to appropreate maximum.')
      }
    }
    const id = uuid.v4()
    const method = 'set-interval'
    const params = [{ interval: normalizedValue }] // should be in milliseconds
    const payload = {
      type: 'rpc-request',
      id,
      method,
      params
    }
    return sendDataToDevice(payload)
  }

  return {
    get proximity() {
      return internalProximity
    },
    get mode() {
      return internalMode
    },
    connect,
    subscribeToProximityUpdates,
    subscribeToGestureUpdates,
    setToGestureMode,
    setToProximityMode,
    setPollingInterval
  }
}

const getConnectedKanoMotionDetectors = () => SerialPort.list().then(ports => {
  const kanoMotionDetectorVendorID = '2341'
  const kanoMotionDetectorProductID = '814e'
  const foundDevices = ports.filter(({ vendorId, productId }) => {
    const isExpectedVendorId = vendorId === kanoMotionDetectorVendorID
    const isExpectedProductId = productId === kanoMotionDetectorProductID
    return isExpectedVendorId && isExpectedProductId
  })
  return foundDevices
})

getConnectedKanoMotionDetectors().then(kanoDevices => {
  for (const device of kanoDevices) {
    const { path } = device
    const proximityDetector = makeProximityDetector({ path })
    proximityDetector.subscribeToProximityUpdates(proximity => {
      console.log({ proximity })
    })
    proximityDetector.subscribeToGestureUpdates(gesture => {
      console.log({ gesture })
    })
    proximityDetector.connect().then(() => {
      console.log('Connected!')
      // proximityDetector.setToGestureMode().then(() => {
      //   console.log('Gesture Mode Set!')
      // })
      proximityDetector.setPollingInterval(50).then(() => {
        console.log('Interval Set!')
      })
      proximityDetector.setToProximityMode().then(() => {
        console.log('Proximity Mode Set!')
      })
    })
  }
})