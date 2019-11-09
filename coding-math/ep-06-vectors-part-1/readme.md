Episode: [Youtube](https://www.youtube.com/watch?v=DfGOw8_ZaBA)

# Vectors Part 1

This is about theory.

In Math world, A Vector is usually depicted as a proud arrow.

```
-> (so cute)
```

A `Vector` 
  - Depiction A
    - Has `Direction`
      - the `angle` the arrow is pointing in.
    - Has `Magnitude`
      - the `length` of the arrow itself.
  - Depiction B
    - Has `Head`
      - a `point` in space.
    - Has `Tail`
      - a `point` in space.

And again, It is usually depicted as an Arrow. `--->`

This video deals with 2d, but these can be represented in any number of dimensions.

### Anatomy
```
                         \
  tail   =================>   head
   /                     /      \
  Where it                    Where it's
  came from                   going!
```

In Concept:
```
 A ---> B
```

Nemonic Story:

You are on vacation, you are on your way to somewhere great! You came from your home (A) and you are headed out on a grand adveture (B).

A Vector is a journey.

In Math Slang:
```
Observe, Math notation (kinda)
    ->
    AB

If A is secretly the Origin:
You may also see this:

    ->
    0B

Sometimes, its literally just:

    →
    B

```

In the real world:

![one way sign](./brendan-church-pKeF6Tt3c08-unsplash.jpg)

Photo by [Brendan Church](https://unsplash.com/@bdchu614?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/arrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

In Programming World (kinda):

```js
// A vector is a pair of `X` and `Y` values.

const vectorExample = {
  pointA:{
    x:25,
    y:50
  },
  pointB:{
    x:100,
    y:100
  }
}

// But wait!
// What if we only stored the ammount of difference one is from another!

const vectorExample2 = {
  x: 75,
  y: 50
}

// When traditionally computed, both of above are equlvalent.

const anotherVectorExample = {
  angle: 30,
  magnitude: 9000
}

const yetAnother = {
  angle: 45,
  force: -0.6
}

const angleToVector = ({ angle, magnitude }) => {
  // remember, the angle is in Radians ;-)
  const x = magnitude * Math.cos(angle)
  const y = magnitude * Math.sin(angle)
  return { x, y } 
}

const xyToAngleAndMagnitude = ({ x, y }) => {
  const angle = Math.atan2(y, x)
  const length = //???
}

```

### Pracical Applications

You can find `Vectors` in situations like:

- Position
  - `Magnitude` represents `distance` as a magnitude is `length`-y
  - `Distance` can be thought of as the number of units it is away from a given origin.
```js
const position = { x:5, y:9 }
```

- Velocity
  - `Magnitude` represents `speed` 
    - [ mph, pixels per frame, fps, snoots per minute ] 
    - The Faster the `speed` the `longer` the arrow!
  - `Direction` represents `["heading", "angle it is moving"]`
```js
const velocity = {
  oldX:4,
  oldY:5,
  x:10,
  y:12
}
```
Others:
  - Acceleration
  - Force
  - Anything that has a `Direction` and a `Magnitude`

---
# Now Entering Math World.

## Addition

```js

// this is with that good ol' X and Y brainspace

// Clear
const addVectors = ({ vectorA, vectorB }) => {
  const x = vectorA.x + vectorB.x
  const y = vectorA.y + vectorB.y
  return { x, y }
}

// Functional
const addVectors = ([
  {
    x:firstX, 
    y:firstY
  },
  ...vectors
]) => vectors.reduce((acc, {x, y})=>{
  acc.x += x
  acc.y += y
  return acc
},{ 
  x:firstX, 
  y:firstY 
})

```
### Visual Addition:
The video has some great illustrations of how to add vectors together by drawing them `Head` to `Tail` in any order and then taking note of where the first point is and the last point is, or, where the resulting snake's teeth are and its rattlers.

## Subtraction

### Visual Subtraction
Place the `heads` of two vectors together and then make a new vector out of both of their `tails`

### Code
```js
const subtractVectors = ({ vectorA, vectorB }) => {
  const x = vectorA.x - vectorB.x
  const y = vectorA.y - vectorB.y
  return { x, y }
}
```

## Multiplication

There are two considerations.

### Consideration A: Multiplicaton of a Vector by Another Vector.

```js
const multiplyVectors = ({ vectorA, vectorB }) => {
  const x = vectorA.x * vectorB.x
  const y = vectorA.y * vectorB.y
  return { x, y } 
}
```

Note: Also mentioned Dot Products and Cross Products, but did not go into detail yet.

### Consideration B: Multiplication of a Vector by a Scalar value

- A `Scalar` value 
  - is a regular ol number of some sort.
  - you know: `1`, `-69`, `4.20`

```js
const multiplyVector = ({ amount, vector }) => {
  const x = vector.x * amount
  const y = vector.y * amount
  return { x, y }
}

// notice how the angle does not change.
const multiplyVector2 = ({ amount, vector }) => {
  const { angle, magnitude } = vector
  const newMagnitude = magnitude * amount
  return {
    angle,
    magnitude: newMagnitude
  }
}
```
This can also be though of as changing the `SCALE` of a the vector, making it bigger or smaller.

## Division

See `multiplication` section above, it works the same.