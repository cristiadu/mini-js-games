import {
  MAX_BOUNCE_ANGLE, SIZE_BLOCK, THICKNESS_BLOCK,
} from './globalVariables.js'
import getRandomColor from './utils.js'

export default class Block {
  constructor() {
    this.X = 0
    this.Y = 0
    this.color = getRandomColor()
    this.show = true
  }

  draw(ctx) {
    if (this.show) {
      ctx.fillStyle = this.color
      ctx.fillRect(this.X, this.Y, SIZE_BLOCK, THICKNESS_BLOCK)
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.strokeRect(this.X, this.Y, SIZE_BLOCK, THICKNESS_BLOCK)
    }
  }

  // Bounce angle based on how far from the block's center the ball hit
  getBounceAngle(intersectX) {
    const relativeIntersection = this.X + (SIZE_BLOCK / 2) - intersectX
    return (relativeIntersection / (SIZE_BLOCK / 2)) * MAX_BOUNCE_ANGLE
  }

  init(line, collumn) {
    this.Y = line * THICKNESS_BLOCK
    this.X = collumn * SIZE_BLOCK
  }
}
