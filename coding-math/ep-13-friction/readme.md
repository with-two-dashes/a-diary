Episode: https://www.youtube.com/watch?v=ueqi8boYS5k&t=603s

# Friction

There is the `Correct` way and the `Wrong` way, but both have their merits.

There are many types of friction.
- Dry
- Fluid
- Lubricated
- Skin
- Internal

https://en.wikipedia.org/wiki/Friction

This lesson will mostly cover `Dry` and `Skin` types.

`Dry Friction` is
- When two surfaces are in contact.

`Skin Friction` is
- When an object is passing through a liquid or the atmosphere, etc.
- AKA: `Drag`

## Inherint notions:

When you are moving at a given speed, when you encounter friction, you start to slow down.

"Friction will change your `speed`."

We also know that `speed` is one component of `velocity`.

"Friction is something that changes `velocity`."

Is that not the same as `Acceleration`? (yep, they both change velocity.)

## Things that affect Friction

- Object Material.
- Medium Material is in.
- Surface Area.
- Shape
- Weight
- Slope
- Temperature
- Turbulence
- etc

Yep. Thats a lot.

For our fun times, we will use a single `Vector`!

This `Friction Vector` will have its direction exactly opposite the direction of the `velocity` of the object that it is working on.

```

  ###
  ###--------------------------------> velocity
  ###                              <-- friction

```

If you add them together, this is about the same as friction slowing down an object.

Note that it does not matter the angle, friction will act upon that `angle` as an opposite force.

`Newton`:
> For every action, there is an equal and opposite reaction.

Also note, for these lessons:

An Object's velocity will have no effect on the ammount of friction being applied.

For a Given Object in a Given Environment, the friction will be the same.

This does not matter if the object is moving Fast or Slow.

This is a major simplification, but it remains kinda true anyway.

## Mental Model time

Imagine throwing a ball straight up into the air. `Gravity` (another `vector` friend) will gradually slow it down and then pull the ball back to Earth.

`Friction will never Reverse the direction of an object.`

It will `Stop` an object, but it alone wont cause it to return to where it came from.


## Correct Friction
```js
const particle = makeParticle({
  x: width / 2,
  y: height / 2,
  direction: Math.PI * Math.random() * 2,
  speed: 10,
  radius: 10
})

const friction = makeVector({
  x: 0.15,
  y: 0
})

const render = ({ timestamp, resized, context, canvas }) => {
  clearCanvas({ context })
  const { width, height } = canvas

  friction.angle = particle.velocity.angle
  if (particle.velocity.length > friction.length) {
    particle.velocity.subtractFrom(friction)
  } else {
    particle.velocity.length = 0 // we stop once we stop
  }
  particle.update()

  context.beginPath()
  context.arc(particle.position.x, particle.position.y, particle.radius, 0, Math.PI * 2, false)
  context.fill()
}
```
---
The video makes the case that the above is far too complex and CPU hungry as it uses all of these Math functions in the Particle class.

---

Well, have a look at the code in `main.js` and the updated `makeParticle.js` files.
