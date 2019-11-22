import { Engine, World, Bodies } from 'matter-js'
import { getContext, setupRender, startRender } from './canvasEngineLibrary'

const myPhysicsEngine = Engine.create()

const { canvas: { width, height } } = getContext()

const ground = Bodies.rectangle(100, 100, 100, 100, { isStatic: true })

const addToMyWorld = (...rest) => World.add(myPhysicsEngine.world, [...rest])

addToMyWorld(ground)

const renderItem = ({ item, context }) => {
  const { vertices } = item
  const [firstVertex, ...allOtherVertexes] = vertices
  context.moveTo(firstVertex.x, firstVertex.y)
  for (const vertex of allOtherVertexes) {
    context.lineTo(vertex.x, vertex.y)
  }
  context.lineTo(firstVertex.x, firstVertex.y)
}
