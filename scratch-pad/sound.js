// Speed of Sound = 345 m/s = 1130 ft/s = 770 miles/hr

const calculateNotes = () => {
  const letters = [
    'C',
    null,
    'D',
    null,
    'E',
    'F',
    null,
    'G',
    null,
    'A',
    null,
    'B'
  ]
  const output = []
  let octave = -1
  const compute = n => {
    // hz algo swiped from: https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
    const hz = n => 440 * Math.pow(2, (n - 69) / 12)
    const index = n % letters.length
    const letter = letters[index]
    const frequency = hz(n)
    if (!letter) {
      const flat = letters[index - 1]
      const sharp = letters[index + 1]
      return {
        isAccidental: true,
        letter: `${flat}b / ${sharp}#`,
        frequency
      }
    } else {
      return {
        isAccidental: false,
        letter: `${letter}`,
        frequency
      }
    }
  }
  let lastLetter = null
  // Did you know there are 128 keys on a MIDI 1.0 Keyboard?
  for (let i = 0; i < 128; i++) {
    const { letter, isAccidental, frequency } = compute(i)
    if (lastLetter === 'B') {
      octave++
    }
    output.push({
      midiNote: i,
      name: letter,
      isAccidental,
      frequency,
      octave
    })
    lastLetter = letter
  }
  return output
}

const notes = calculateNotes()

console.log({ notes })
