// the following allows us to use generators
// and keep Babel happy.

// the actual code should work in supported browsers.

import 'core-js/stable'
import 'regenerator-runtime/runtime'

const minMax = ([valueA, valueB]) => {
  const min = Math.min(valueA, valueB)
  const max = Math.max(valueA, valueB)
  return { min, max }
}

function * makeRangeIterator ({
  start,
  end,
  step = 1
}) {
  const { min, max } = minMax([start, end])
  const absStep = Math.abs(step)
  if (min === max) {
    yield min
  } else {
    const startIsBigger = start === max
    if (startIsBigger) {
      for (let value = start; value >= end; value -= absStep) {
        yield value
      }
    } else {
      for (let value = start; value <= end; value += absStep) {
        yield value
      }
    }
  }
}

const sequence = makeRangeIterator({ start: 0, end: 10 })

for (const value of sequence) {
  console.log('VALUE', value)
}

const boop = [...sequence]

console.log({ boop, sequence })
