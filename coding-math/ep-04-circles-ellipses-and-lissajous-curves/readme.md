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