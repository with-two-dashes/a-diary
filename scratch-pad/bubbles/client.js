import { Engine, World, Bodies } from 'matter-js'
import {
  getContext,
  setupRender,
  startRender,
  resizeCanvas
} from './canvasEngineLibrary'

const myPhysicsEngine = Engine.create()

const { canvas } = getContext()
document.body.appendChild(canvas)
resizeCanvas()
const { width, height } = canvas

const ground = Bodies.rectangle(width / 2, height - 50, width, 100, { isStatic: true })
const leftWall = Bodies.rectangle(0, height / 2, 10, height, { isStatic: true })
const rightWall = Bodies.rectangle(width, height / 2, 10, height, { isStatic: true })

const addToMyWorld = (...rest) => World.add(myPhysicsEngine.world, [...rest])
addToMyWorld(ground, leftWall, rightWall)
const circleCount = 800

const circles = []

const randomX = () => Math.random() * width
const randomY = () => Math.random() * height

while (circles.length < circleCount) {
  const aCircle = Bodies.circle(randomX(), randomY(), 10)
  circles.push(aCircle)
  addToMyWorld(aCircle)
}

const renderItem = ({ item, context }) => {
  const { vertices } = item
  const [firstVertex, ...allOtherVertexes] = vertices
  context.moveTo(firstVertex.x, firstVertex.y)
  for (const vertex of allOtherVertexes) {
    context.lineTo(vertex.x, vertex.y)
  }
  context.lineTo(firstVertex.x, firstVertex.y)
}

setupRender(({ context, clearCanvas, deltaTime }) => {
  Engine.update(myPhysicsEngine)
  // Engine.run(myPhysicsEngine)
  clearCanvas()
  const drawWireframe = ({ item }) => {
    context.beginPath()
    renderItem({
      item,
      context
    })
    context.stroke()
  }

  for (const circle of circles) {
    context.beginPath()
    context.arc(circle.position.x, circle.position.y, 10, 0, Math.PI * 2)
    context.fill()
  }

  drawWireframe({ item: ground })
  drawWireframe({ item: leftWall })
  drawWireframe({ item: rightWall })
})

startRender()
