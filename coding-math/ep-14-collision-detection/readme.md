Episode: https://www.youtube.com/watch?v=NZHzgXFKfuY

# Collision Detection

Also sometimes known as `Hit Testing`

Generally, games use the term Collision Detection and User Interfaces use Hit Testing, but these lessons apply to both.

For our purposes:
  When an object hits something, or when two objects hit eachother.

This is more of an `art` than a science.

There are usually tradeoffs between accuracy and performance.

We sorta covered part of this in the `edge handling` episode.

There are generally two worlds when determinining hit detection.

- Mathematically
  - use some sort of mathematical model that describes the shapes and their dimensions, positions, etc.
  - you use calculations to determine whether or not two items are toucing or overlapping.

- Graphically
  - using the defined screen pixels of each object and seeing if they overlap.
  - some languages have tools to compare the bitmaps of two shapes, leading to accurate to the pixel detecton.
  - this is also outside of this lesson.

---

We will be using the `Mathematical` model

---

We will have objects with defined Shapes
- circle
- rectangle
- point

We will also deal with `four` types of collision in this lesson.

- Circle / Circle
- Circle / Point
- Rectangle / Rectangle
- Rectangle / Point

## Circle / Circle

```js
// psudocode:
const areCirclesTouching = ({ circleA, circleB }) => {
  const distance = getDistanceBetween({
    pointA: circleA.position,
    pointB: circleB.position
  })
  const combinedRadius = circleA.radius + circleB.radius
  const isTouching = combinedRadius >= distance
  return isTouching
}

```