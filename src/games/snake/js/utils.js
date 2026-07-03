/**
 * Returns a random integer between min and max, both inclusive.
 *
 * @param {number} min Lower bound (inclusive).
 * @param {number} max Upper bound (inclusive).
 * @returns {number} Random integer in [min, max].
 */
export default function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
