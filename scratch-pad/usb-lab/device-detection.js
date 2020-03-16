var usbDetect = require('usb-detection')

usbDetect.startMonitoring()

const VendorID = 9025
const ProductID = 33102

usbDetect.on(`add:${VendorID}:${ProductID}`, device => {
  console.log('Hello MotionSensor!', device)
})

usbDetect.on(`remove:${VendorID}:${ProductID}`, device => {
  console.log('Goodbye MotionSensor!', device)
})

usbDetect.find(VendorID, ProductID).then(motionSensors => {
  console.log(`Good Morning, ${motionSensors.length} detected.`)
})