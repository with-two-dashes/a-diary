Episode: https://www.youtube.com/watch?v=yAHl_kpqr-k

# Intro to Trigonometry

Trigonometry is the study of triangles.
  
In particular the relationships between:

- The `sides` of a triangle
- The `angles` of a triangle

This lesson deals with `Right Triangles`.

```
                        /|
                       / |
                      /  | 
                     /   |
                    /    |
                   /     |
                  /      |
                 /       |
                /        |
               /         |
              /          |
             /           |
            /            |
           /             |
          /              |
         /               |
        /                |
       /                 |
      /                  |
     /             |-----|
    /              |     |
 A /_______________|_____|
```


- A `Right triangle`:
  - has 1 `right angle` (90 degrees)
    - indicated by a square in the angle's corner.

- A `Right Angle`
  - is exactly 90 degrees.
    
- A `Hypotenuse`
  - is the `side` directly oposite the right angle in a right triangle.
  - Always the longest `side`.
    - except in a few special cases.
- An `Opposite`
  - is the `side` that is opposite the angle you are thinking about. 
  - In the illustration above, it is the vertical line in relation to `angle A`
  - The `hypotenuse` is `opposite` the `right angle`

- An `Adjacent`
  - is the `side` that is next to the angle you are thinking about.
  - In the illustration above, it is the horizontal line in relation to `angle A`

---

There are 3 major trig functions.

- These are
  - ratios
  - one side that is divided by another side.

- sine 
  - `Math.sin(angle)`
  - `opposite` / `hypotenuse`
  - Take the length of the `opposite` `side` and divide it by the length of the `hypotenuse` `side`
  - Min: `-1`
  - Max: `1`
- cosine
  - `Math.cos(angle)`
  - `adjacent` / `hypotenuse`
  - Take the length of the `adjacent` `side` and divide it by the length of the `hypotenuse` `side`
- tangent
  - `Math.tan(angle)`
  - `opposite` / `adjacent`
  - Take the length of the `opposite` `side` and divide it by the length of the `adjacent` `side`

---

- sin
  - example a
    - `Hypotenuse` = 1
    - `angle` = 0
    - `sin(0)` = 0
    - `Opposite` = 0
  - example b
    - `Hypotenuse` = 1
    - `angle` = 30
    - `sin(30)` = .5
    - `Opposite` = .5
  - example c
    - `Hypotenuse` = 1
    - `angle` = 60
    - `sin(60)` = .866...
    - `Opposite` = .866...
  - example d
    - `Hypotenuse` = 1
    - `angle` = 90
    - `Adjacent` = 0
    - `sin(90)` = 1
    - `Opposite` = 1
  - example e
    - `Hypotenuse` = 1
    - `angle` = 120
    - `sin(120)` = .866...
    - `Opposite` = .866...
  - example f
    - `Hypotenuse` = 1
    - `angle` = 150
    - `sin(150)` = .5
    - `Opposite` = .5
  - example g
    - `Hypotenuse` = 1
    - `angle` = 180
    - `Adjacent` = 0
    - `sin(180)` = 0
    - `Opposite` = 0
  - example h
    - `Hypotenuse` = 1
    - `angle` = 210
    - `sin(210)` = -0.5
    - `Opposite` = -0.5
  - example i
    - `Hypotenuse` = 1
    - `angle` = 240
    - `sin(240)` = -.866...
    - `Opposite` = -.866...
  - example j
    - `Hypotenuse` = 1
    - `angle` = 270
    - `sin(270)` = -1
    - `Opposite` = -1
  - example k
    - `Hypotenuse` = 1
    - `angle` = 300
    - `sin(300)` = -0.866...
    - `Opposite` = -0.866...
  - example l
    - `Hypotenuse` = 1
    - `angle` = 330
    - `sin(330)` = -0.5...
    - `Opposite` = -0.5...
  - example m
    - `Hypotenuse` = 1
    - `angle` = 360
    - `sin(360)` = 0
    - `Opposite` = 0

--- 

# Computer Graphics Coordinate System

Most computer graphics has the Y axis inverted.

### Normal Math:

```
        + Y
         |
         |
- X -----|----- + X
         |
         |
        - Y
```

### Computer Graphics Math

```
        - Y
         |
         |
- X -----|----- + X
         |
         |
        + Y
```

This also means that:
  
- Normal Math:
  - as the `angle` value increases:
    - The `sin(angle)` value rotates `counter-clockwise`.

- Computer Graphics Math:
  - as the `angle` value increases:
    - The `sin(angle)` value rotates `clockwise`.

- Also, 
  - Normal math uses Angles in `Degrees`.
  - CGM uses Angles in `Radians`.
    - 1 `radian` = ~57.3 `degrees`
    - See conversions section below.

## Conversions

```js
const getDegrees = radians => (radians * 180) / Math.PI
const getRadians = degrees => (degrees * Math.PI) / 180
```
