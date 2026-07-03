import {
  MAX_BOUNCE_ANGLE, SIZE_BLOCK, THICKNESS_BLOCK,
} from './globalVariables.js'
import getRandomColor from './utils.js'

/**
 * One block of the breakable grid. Gets a random color, and is hidden
 * (show = false) instead of removed once the ball destroys it.
 */
export default class Block {
  /** Creates a visible, randomly colored block; call init() to place it in the grid. */
  constructor() {
    this.X = 0
    this.Y = 0
    this.color = getRandomColor()
    this.show = true
  }

  /**
   * Renders the block with a white border, if it has not been destroyed.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw = (ctx) => {
    if (this.show) {
      ctx.fillStyle = this.color
      ctx.fillRect(this.X, this.Y, SIZE_BLOCK, THICKNESS_BLOCK)
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.strokeRect(this.X, this.Y, SIZE_BLOCK, THICKNESS_BLOCK)
    }
  }

  /**
   * Computes the rebound angle for a ball hit, based on how far from the
   * block's center it struck: 0 at the center up to ±MAX_BOUNCE_ANGLE at the edges.
   *
   * @param {number} intersectX X position where the ball hit, in pixels.
   * @returns {number} Bounce angle in radians.
   */
  getBounceAngle = (intersectX) => {
    const relativeIntersection = this.X + (SIZE_BLOCK / 2) - intersectX
    return (relativeIntersection / (SIZE_BLOCK / 2)) * MAX_BOUNCE_ANGLE
  }

  /**
   * Places the block on the grid.
   *
   * @param {number} line Zero-based row index from the top.
   * @param {number} collumn Zero-based column index from the left.
   */
  init = (line, collumn) => {
    this.Y = line * THICKNESS_BLOCK
    this.X = collumn * SIZE_BLOCK
  }
}
