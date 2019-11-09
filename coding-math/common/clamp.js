// locks a value between the min and max values.
export const clamp = ({ min, max, value }) => Math.min(max, Math.max(value, min))