import { getDPR } from './getDPR.js'
export const canvasSizer = ({ canvas }) => {
  const dpr = getDPR()
  const targetWidth = canvas.clientWidth * dpr
  const targetHeight = canvas.clientHeight * dpr
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth
    canvas.height = targetHeight
    return { resized: true }
  } else {
    return { resized: false }
  }
}
