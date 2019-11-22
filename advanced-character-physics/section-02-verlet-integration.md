# Verlet Integration

The beating heart of this simulation shall be a particle system. 

In a typical `particle-system` we might see:
- a variable for `position`
- a variable for `velocity`

and then, in a time step loop you get the new `position` and `velocity` using something
similar to the following:

```js

const particle = {
  velocity:{
    x:10,
    y:5
  },
  position:{
    x:2,
    y:1,
  },
  friction:.99
}

let lastTimestamp = null

const updatePhysics = timeStep => {
  particle.position.x += particle.velocity.x * timeStep
  particle.position.y += particle.velocity.y * timeStep
  particle.velocity.x *= friction
  particle.velocity.y *= friction
}

const heartbeat = timestamp => {
  const timeStep = timestamp - lastTimestamp
  requestAnimationFrame(heartbeat)
  updatePhysics(timeStep)
  lastTimestamp = timestamp
}

requestAnimationFrame(heartbeat)
```

The above is a representation of `Euler` "Oil-er" integration.

Our beast shall be made of different stuff.

```js

const particle = {
  position:{
    x:4,
    y:1
  },
  oldPosition:{
    x:2,
    y:1,
  },
  friction:.99
}

let lastTimestamp = null

const updatePhysics = timeStep => {
  const velocityX = (particle.position.x - particle.oldPosition.x) * particle.friction
  const velocityY = (particle.position.y - particle.oldPosition.y) * particle.friction
  particle.oldPosition.x = particle.position.x
  particle.oldPosition.y = friction.position.y
  particle.position.x += velocityX * timeStep
  particle.position.y += velocityY * timeStep
  particle.velocity.x *= friction
  particle.velocity.y *= friction
}

const heartbeat = timestamp => {
  const timeStep = timestamp - lastTimestamp
  requestAnimationFrame(heartbeat)
  updatePhysics(timeStep)
  lastTimestamp = timestamp
}

requestAnimationFrame(heartbeat)
```