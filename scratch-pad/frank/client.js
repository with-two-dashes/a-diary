import ReglMothership from 'regl'
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
const regl = ReglMothership(canvas)

// Calling regl() creates a new partially evaluated draw command
const drawTriangle = regl({

  // Shaders in regl are just strings.  You can use glslify or whatever you want
  // to define them.  No need to manually create shader objects.
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,

  // Here we define the vertex attributes for the above shader
  attributes: {
    // regl.buffer creates a new array buffer object
    position: regl.buffer([
      [-2, -2],   // no need to flatten nested arrays, regl automatically
      [4, -2],    // unrolls them into a typedarray (default Float32)
      [4, 4]
    ])
    // regl automatically infers sane defaults for the vertex attribute pointers
  },

  uniforms: {
    // This defines the color of the triangle to be a dynamic variable
    color: regl.prop('color')
  },

  // This tells regl the number of vertices to draw in this command
  count: 3
})

const setViewport = ({ left, top, right, bottom }) => regl({
  viewport: {
    x: left,
    y: top,
    w: right,
    h: bottom
  }
})


const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1.0
  const targetWidth = canvas.clientWidth * dpr
  const targetHeight = canvas.clientHeight * dpr
  if (canvas.width != targetWidth || canvas.height != targetHeight) {
    canvas.width = targetWidth
    canvas.height = targetHeight
    setViewport({
      left: 0,
      top: 0,
      right: targetWidth,
      bottom: targetHeight
    })
  }
}

// regl.frame() wraps requestAnimationFrame and also handles viewport changes
regl.frame(({ time }) => {
  resizeCanvas()

  // clear contents of the drawing buffer
  regl.clear({
    color: [0, 0, 0, 0],
    depth: 1
  })

  // const r = Math.cos(time * 0.001)
  const r = 1 * Math.random()
  const g = Math.sin(time * 0.0008)
  const b = Math.cos(time * 0.003)
  const a = 1
  const color = [r, g, b, a]

  // console.log('tick', { r, g, b, time })

  // draw a triangle using the command defined above
  drawTriangle({ color })
})