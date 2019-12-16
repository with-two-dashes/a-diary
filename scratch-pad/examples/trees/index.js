console.log('Trees!')

const urls = [
  '/',
  '/hello',
  '/goodbye',
  '/goodbye',
  '/goodbye',
  '/goodbye',
  '/nope',
  '/nope/yes',
  '/nope/yes/wow',
  '/hmm/wow/yeah',
  '/hello/123',
  '/hello/123/1',
  '/october/november/december/123'
]

const makeTreeFromUrlArray = urlArray => {
  const makeAncestryArray = url => {
    const splitAlongSlashes = url.split('/')
    splitAlongSlashes.shift() // remove the first entry. its always an empty string.
    const output = []
    let lastPart = ''
    for (const part of splitAlongSlashes) {
      const parent = lastPart === '' ? '/' : lastPart
      lastPart = `${lastPart}/${part}`
      output.push({
        part: lastPart,
        parent
      })
    }
    return output
  }

  const mapping = new Map()

  for (const url of urlArray) {
    const pathParts = makeAncestryArray(url)
    for (const pathPart of pathParts) {
      const { part, parent } = pathPart
      if (mapping.has(parent) === false) {
        mapping.set(parent, {
          path: parent,
          children: new Set()
        })
      }

      const parentPart = mapping.get(parent)
      if (parent !== part) {
        if (parentPart.children.has(part) === false) {
          parentPart.children.add(part)
        }
      }
    }
  }

  const intermediateA = []

  for (const part of mapping.values()) {
    const children = Array.from(part.children)
    const path = part.path
    intermediateA.push({
      id: path,
      children
    })
    for (const child of children) {
      if (mapping.has(child) === false) {
        intermediateA.push({
          id: child,
          children: []
        })
      }
    }
  }

  const intermediateB = []

  for (const part of intermediateA) {
    const { id, children } = part
    for (const child of children) {
      const thing = {
        id: child,
        parent: id
      }
      intermediateB.push(thing)
    }
  }

  return intermediateB
}

const tree = makeTreeFromUrlArray(urls)

console.log(tree)
