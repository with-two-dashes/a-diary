Episode: https://www.youtube.com/watch?v=SoYnZHBP-6M

# Circles, Ellipses and Lissajous Curves

Note: `Lissajous` is pronounced `liss-ah-jew`

---

Now we are going to try do animate objects in a circle.

To do this, think of the `hypotenuse` as the `radius` of the circle.

```js

const angle = // some value in radians
const radius = // some value
const x = radius * Math.cos(angle)
const y = radius * Math.sin(angle)

```

---

## Circle:

```js
let angle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const centerX = width * 0.5
  const centerY = height * 0.5

  const radius = 200
  const speed = 0.1

  const x = centerX + Math.cos(angle) * radius
  const y = centerY + Math.sin(angle) * radius

  context.beginPath()
  context.moveTo(centerX, centerY)
  context.lineTo(x, y)
  context.stroke()

  context.beginPath()
  context.arc(x, y, 10, 0, Math.PI * 2, false)
  context.fill()

  angle += speed
}
```

## Ellipse:

```js
let angle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  const centerX = width * 0.5
  const centerY = height * 0.5

  const xRadius = 400
  const yRadius = 200
  const speed = 0.1

  const x = centerX + Math.cos(angle) * xRadius
  const y = centerY + Math.sin(angle) * yRadius

  context.beginPath()
  context.moveTo(centerX, centerY)
  context.lineTo(x, y)
  context.stroke()

  context.beginPath()
  context.arc(x, y, 10, 0, Math.PI * 2, false)
  context.fill()

  angle += speed
}
```

## Lissajous Curve:

Be sure to play with the speed and radius values to get different shapes.

```js
let xAngle = 0
let yAngle = 0

const render = ({ timestamp, resized, context, canvas }) => {
  // clearCanvas({ context })
  const { width, height } = canvas

  const centerX = width * 0.5
  const centerY = height * 0.5

  const xRadius = 500
  const yRadius = 300
  const xSpeed = 0.01
  const ySpeed = 0.05

  const x = centerX + Math.cos(xAngle) * xRadius
  const y = centerY + Math.sin(yAngle) * yRadius

  // context.beginPath()
  // context.moveTo(centerX, centerY)
  // context.lineTo(x, y)
  // context.stroke()

  context.beginPath()
  context.arc(x, y, 10, 0, Math.PI * 2, false)
  context.fill()

  xAngle += xSpeed
  yAngle += ySpeed
}

```