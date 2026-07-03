/**
 * Returns a random fully opaque CSS color.
 *
 * @returns {string} Color in 'rgb(r,g,b)' form with each channel in [0, 255].
 */
const getRandomColor = () => {
  const r = 255 * Math.random() | 0
  const g = 255 * Math.random() | 0
  const b = 255 * Math.random() | 0
  return `rgb(${r},${g},${b})`
}

export default getRandomColor
