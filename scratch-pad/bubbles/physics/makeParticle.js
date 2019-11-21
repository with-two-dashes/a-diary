export const makeParticle = ({
  x = 0,
  y = 0,
  vx = 0,
  vy = 0,
  speed = 0,
  direction = 0,
  gravity = 0,
  mass = 1,
  radius = 0,
  bounce = 1,
  friction = 1
}) => {
  let internalX = x
  let internalY = y
  let internalVX = vx
  let internalVY = vy
  let internalMass = mass
  let internalRadius = radius
  let internalBounce = bounce
  let internalGravity = gravity
  let internalFriction = friction
  let internalSprings = []
  let internalGravitations = []

  setSpeed(speed)
  setHeading(direction)

  const handleSprings = () => {
    for (const spring of internalSprings) {
      springTo({
        particle: spring.point,
        stiffness: spring.stiffness,
        length: spring.length
      })
    }
  }

  const handleGravitations = () => {
    for (const particle of internalGravitations) {
      gravatateTo(particle)
    }
  }

  function getSpeed () {
    return Math.sqrt(internalVX * internalVX + internalVY * internalVY)
  }

  function getHeading () {
    return Math.atan2(internalVY, internalVX)
  }

  function setHeading (angle) {
    const speed = getSpeed()
    internalVX = Math.cos(angle) * speed
    internalVY = Math.sin(angle) * speed
  }

  function setSpeed (newSpeed) {
    const headingAngle = getHeading()
    internalVX = Math.cos(headingAngle) * newSpeed
    internalVY = Math.sin(headingAngle) * newSpeed
  }

  const update = () => {
    handleSprings()
    handleGravitations()
    internalVX *= internalFriction
    internalVY *= internalFriction
    internalVY += internalGravity
    internalX += internalVX
    internalY += internalVY
  }

  const accelerate = ({ x, y }) => {
    internalX += x
    internalY += y
  }

  const angleTo = otherParticle => {
    const y = otherParticle.y - internalY
    const x = otherParticle.x - internalX
    return Math.atan2(y, x)
  }

  const distanceTo = otherParticle => {
    const distanceX = otherParticle.x - internalX
    const distanceY = otherParticle.y - internalY
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY)
    return Math.sqrt(distanceSquared)
  }

  const gravatateTo = otherParticle => {
    const { mass, x, y } = otherParticle
    const distanceX = x - internalX
    const distanceY = y - internalY
    const distanceSquared = (distanceX * distanceX) + (distanceY * distanceY)
    const distance = Math.sqrt(distanceSquared)
    const force = mass / distanceSquared
    const accelerationX = (distanceX / distance) * force
    const accelerationY = (distanceY / distance) * force
    internalVX += accelerationX
    internalVY += accelerationY
  }

  const springTo = ({ particle, stiffness, length = 0 }) => {
    const distanceX = particle.x - internalX
    const distanceY = particle.y - internalY
    const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
    const springForce = (distance - length) * stiffness
    internalVX += (distanceX / distance) * springForce
    internalVY += (distanceY / distance) * springForce
  }

  const addSpring = ({ point, stiffness, length = 0 }) => {
    const newSprings = removeSpring({ point })
    newSprings.push({
      point,
      stiffness,
      length
    })
    internalSprings = newSprings
    return internalSprings
  }

  const removeSpring = ({ point }) => {
    internalSprings = internalSprings.filter(({ point: existingPoint }) => {
      if (point === existingPoint) {
        return false
      } else {
        return true
      }
    })
    return internalSprings
  }

  const addGravitation = ({ particle }) => {
    removeGravitation({ particle })
    internalGravitations = [
      ...internalGravitations,
      particle
    ]
    internalGravitations.push(particle)
  }

  const removeGravitation = ({ particle }) => {
    internalGravitations = internalGravitations.filter((existingParticle) => {
      if (existingParticle === particle) {
        return false
      } else {
        return true
      }
    })
  }

  return {
    update,
    accelerate,
    angleTo,
    distanceTo,
    gravatateTo,
    springTo,
    addSpring,
    removeSpring,
    addGravitation,
    removeGravitation,
    get x () {
      return internalX
    },
    set x (newX) {
      internalX = newX
    },
    get y () {
      return internalY
    },
    set y (newY) {
      internalY = newY
    },
    get vx () {
      return internalVX
    },
    set vx (newVX) {
      internalVX = newVX
    },
    get vy () {
      return internalVY
    },
    set vy (newVY) {
      internalVY = newVY
    },
    get radius () {
      return internalRadius
    },
    set radius (newRadius) {
      internalRadius = newRadius
    },
    get speed () {
      return getSpeed()
    },
    set speed (newSpeed) {
      setSpeed(newSpeed)
    },
    get direction () {
      return getHeading()
    },
    set direction (direction) {
      setHeading(direction)
    },
    get mass () {
      return internalMass
    },
    set mass (newMass) {
      internalMass = newMass
    },
    get bounce () {
      return internalBounce
    },
    set bounce (newBounce) {
      internalBounce = newBounce
    },
    get gravity () {
      return internalGravity
    },
    set gravity (newGravity) {
      internalGravity = newGravity
    },
    get friction () {
      return internalFriction
    },
    set friction (newFriction) {
      internalFriction = newFriction
    }
  }
}
