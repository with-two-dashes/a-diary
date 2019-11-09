// does the opposite of the Norm function
// it returns the value from a given range between 0 and 1
// where that range falls in the number line
export const lerp = ({
  norm, // a value between 0 and 1
  min,
  max
}) => (max - min) * norm + min