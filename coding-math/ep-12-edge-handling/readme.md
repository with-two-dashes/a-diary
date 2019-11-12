Episode: https://www.youtube.com/watch?v=11ZmRlR7sOQ

# Edge Handling

Useful methods to handle when something reaches a boundary or an edge.

## Screen Wrapping

In which the object moves off the screen and then reappears at the other side.

A primitive version was made in Episode 10.

It is less than desirable because the particle blinks out of existance at about half way
and then reappears at the other side.

this happens because the center of the particle is what is used both for detection as well as its placement. By us adding in a radius to the particle, we can now use it to detect the edges of the particle itself.

```js
  // old method works, but it is less pretty:

  if (p.position.x > width) {
    p.position.x = 0
  } else if (p.position.x < 0) {
    p.position.x = width
  }

  if (p.position.y > height) {
    p.position.y = 0
  } else if (p.position.y < 0) {
    p.position.y = height
  }
```

```js

// nice smooth method.
// the item teleports anly after it is completely out of view.
  if (p.position.x - p.radius > width) {
    p.position.x = -p.radius
  } else if (p.position.x < -p.radius) {
    p.position.x = width + p.radius
  }

  if (p.position.y - p.radius > height) {
    p.position.y = -p.radius
  } else if (p.position.y < -p.radius) {
    p.position.y = height + p.radius
  }
```

## Removal

When an object moves out range, you just remove it.

We don't always want things to live forever.

Once we are done with something we can simply remove it.

```js
// ...

const particleCount = 100
let particlesArray = []

for (let i = 0; i < particleCount; i++) {
  particlesArray.push(makeParticle({
    x: width / 2,
    y: height / 2,
    speed: 10 * Math.random() + 4,
    direction: Math.random() * Math.PI * 2,
    radius: Math.random() * 20,
  }))
}

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  particlesArray = particlesArray.filter(p => {

    p.update()

    context.beginPath()
    context.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, false)
    context.fill()

    if (p.position.x - p.radius > width) {
      return false
    } else if (p.position.x < -p.radius) {
      return false
    }

    if (p.position.y - p.radius > height) {
      return false
    } else if (p.position.y < -p.radius) {
      return false
    }

    return true
  })
}
```

## Regeneration

Good for Particles