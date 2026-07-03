import Keyboard from '../../../common/Keyboard.js'
import {
  CONTROLS, MAX_BOUNCE_ANGLE, PADDLE_COLOR, SIZE_PADDLE, SPEED_PADDLE, THICKNESS_PADDLE,
} from './globalVariables.js'

/**
 * The player's paddle: slides horizontally along the bottom of the playfield
 * under arrow-key control, clamped to the playfield edges.
 */
export default class Paddle {
  /** Creates a paddle at the origin; call init() to position it. */
  constructor() {
    this.X = 0
    this.Y = 0
  }

  /** Advances one step: applies input, then clamps to the playfield. */
  update = () => {
    this.checkInput()
    this.checkCollisionWithWall()
  }

  /**
   * Renders the paddle.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw = (ctx) => {
    ctx.fillStyle = PADDLE_COLOR
    ctx.fillRect(this.X, this.Y, SIZE_PADDLE, THICKNESS_PADDLE)
  }

  /** Moves left/right while the corresponding arrow key is held. */
  checkInput = () => {
    if (Keyboard.isDown(CONTROLS.left)) {
      this.X -= SPEED_PADDLE
    } else if (Keyboard.isDown(CONTROLS.right)) {
      this.X += SPEED_PADDLE
    }
  }

  /**
   * Computes the rebound angle for a ball hit, based on how far from the
   * paddle's center it struck: 0 at the center up to ±MAX_BOUNCE_ANGLE at the edges.
   *
   * @param {number} intersectX X position where the ball hit, in pixels.
   * @returns {number} Bounce angle in radians.
   */
  getBounceAngle = (intersectX) => {
    const relativeIntersection = this.X + (SIZE_PADDLE / 2) - intersectX
    return (relativeIntersection / (SIZE_PADDLE / 2)) * MAX_BOUNCE_ANGLE
  }

  /** Clamps the paddle inside the playfield's left and right edges. */
  checkCollisionWithWall = () => {
    if (this.X <= 0) {
      this.X = 0
    } else if (this.X + SIZE_PADDLE >= window.game.width) {
      this.X = window.game.width - SIZE_PADDLE
    }
  }

  /**
   * Places the paddle.
   *
   * @param {number} initialX Starting X position in pixels.
   * @param {number} initialY Starting Y position in pixels.
   */
  init = (initialX, initialY) => {
    this.X = initialX
    this.Y = initialY
  }
}
