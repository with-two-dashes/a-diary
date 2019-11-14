Episode: https://www.youtube.com/watch?v=JywnkK6Iuws

# Springs Part 1

This is one of the teacher's favorite things to code up.

This will be about Springs and Hooke's law.

> As the `extension`, so the `force`
-- Hooke's Law

- The `force` required to 
  - `extend` or `compress` a `spring` 
    - a certain `distance` is
      - proportional to that `distance`

Hmm. Nope, I'm keeping it.


The ammount of force that a spring will exert to return to its rest state is proportional to its distance.

If you stretch a spring out a little way, it will pull back a small ammount.

Stretch it back further, it pulls back harder.

The further you stretch it, the more it pulls back.

In the real world: if you stretch a spring hard enough, it will eventually break or end up misshapen, but simulated ones are rather more robust.

---

All of this can be thought of as an inverse of our friend the `vector`, `gravity`.

- `Gravity`
  - the further away you get from a massive body (like a planet) the less `gravity` is exerted.
  - The force of Gravity is Reversely Proportional to the Square of the Distance.
    - It decreases rapidly, on a curve.
- `Springs`
  - the force increases as you move away from the source
    - it increases linearly.
      - pull the spring out twice as far, you experience twice the force.

---

- Hooke's Law is `F = kX`
  - `F` is the resultant `force`
    - `Acceleration` Vector
  - `k` spring `stiffness` constant 
    - maybe `0.2`
  - `X` is the `distance` that the spring is stretched.