const { makeTreeFromUrlArray } = require('./makeTreeFromUrlArray.js')

const urls = [
  '/alpha/beta/halloween/wer/wwww',
  '/alpha/beta',
  '/alpha/words',
  '/october/32/1000',
  '/goodbye/123',
  '/goodbye/123',
  '/goodbye/123',
  '/hello',
  '/goodbye'
]

const tree = makeTreeFromUrlArray(urls)

console.log('Output Trees!')
console.log(JSON.stringify(tree, null, '  '))
