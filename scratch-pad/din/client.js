console.log('Hello from Din')

const audioCtx = new AudioContext()

// const osc = audioCtx.createOscillator()
// const gain = audioCtx.createGain()
const finish = audioCtx.destination

// console.log({ osc, gain, finish })
// osc.type = 'sine'
// osc.frequency.value = 2600 // in hz
// osc.start() // starts the noise
// osc.connect(gain).connect(finish)

const oscA = audioCtx.createOscillator()
const oscB = audioCtx.createOscillator()

// oscA.type = 'custom'
// oscB.type = 'custom'

// oscA.frequency.value = 1209
// oscB.frequency.value = 697

// oscA.connect(gain).connect(finish)
// oscB.connect(gain).connect(finish)

const real = new Float32Array(2)
const imag = new Float32Array(2)

real[0] = 0
imag[0] = 0
real[1] = 1
imag[1] = 0

const wave = audioCtx.createPeriodicWave(real, imag, { disableNormalization: true })

oscA.setPeriodicWave(wave)
oscB.setPeriodicWave(wave)

oscA.connect(finish)
oscB.connect(finish)

oscA.start()
oscB.start()

oscA.stop(2)
oscB.stop(2)

console.log({ wave })
