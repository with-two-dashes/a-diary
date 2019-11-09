export const lerp = ({
  norm, // a value between 0 and 1
  min,
  max
}) => (max - min) * norm + min