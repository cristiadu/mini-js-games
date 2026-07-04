import Keyboard from '../../../common/Keyboard.js'
import {
  CONTROLS, MAX_BOUNCE_ANGLE, PADDLE_COLOR, PLAYER_TYPE, POSITION, REDUCED_SPEED_AI, SIZE_PADDLE, SPEED_PADDLE, THICKNESS_PADDLE,
} from './globalVariables.js'

/**
 * A pong paddle: slides vertically along its side of the playfield, driven
 * either by keyboard input (human) or by tracking the ball (AI). Also keeps
 * that player's score.
 */
export default class Paddle {
  /**
   * Creates a paddle for one side; call init() to position it.
   *
   * @param {string} pos POSITION value: which side of the playfield the paddle guards.
   * @param {string} pType PLAYER_TYPE value: what drives the paddle (human input or AI).
   */
  constructor(pos, pType) {
    this.playerType = pType
    this.position = pos
    this.X = 0
    this.Y = 0
    this.points = 0
  }

  /** Advances one step: applies AI or keyboard movement, then clamps to the playfield. */
  update = () => {
    if (this.playerType === PLAYER_TYPE.AI) {
      this.moveAI()
    } else {
      this.checkInput()
    }

    this.checkCollisionWithWall()
  }

  /**
   * Renders the paddle.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw = (ctx) => {
    ctx.fillStyle = PADDLE_COLOR
    ctx.fillRect(this.X, this.Y, THICKNESS_PADDLE, SIZE_PADDLE)
  }

  /** Moves up/down from this player's mapped keys (arrows for HUMAN, W/S for HUMAN2). */
  checkInput = () => {
    const controls = CONTROLS[this.playerType]
    if (Keyboard.isDown(controls.down)) {
      this.Y += SPEED_PADDLE
    } else if (Keyboard.isDown(controls.up)) {
      this.Y -= SPEED_PADDLE
    }
  }

  /**
   * Tracks the ball at reduced speed while it approaches, and drifts back to
   * the vertical center once it moves away, so the AI is positioned for the
   * next return but stays beatable. Movement stops inside a small dead zone
   * around the target so the paddle does not jitter once aligned.
   */
  moveAI = () => {
    const ball = window.game.ball
    const ballApproaching = this.position === POSITION.RIGHT ? ball.vX > 0 : ball.vX < 0
    const targetY = ballApproaching ? ball.Y : window.game.height / 2
    const distance = targetY - (this.Y + SIZE_PADDLE / 2)

    if (Math.abs(distance) <= REDUCED_SPEED_AI) {
      return
    }

    this.Y += distance > 0 ? REDUCED_SPEED_AI : -REDUCED_SPEED_AI
  }

  /**
   * Computes the rebound angle for a ball hit, based on how far from the
   * paddle's center it struck: 0 at the center up to ±MAX_BOUNCE_ANGLE at the edges.
   *
   * @param {number} intersectY Y position where the ball hit, in pixels.
   * @returns {number} Bounce angle in radians.
   */
  getBounceAngle = (intersectY) => {
    const relativeIntersection = this.Y + (SIZE_PADDLE / 2) - intersectY
    return (relativeIntersection / (SIZE_PADDLE / 2)) * MAX_BOUNCE_ANGLE
  }

  /** Clamps the paddle inside the playfield's top and bottom edges. */
  checkCollisionWithWall = () => {
    if (this.Y <= 0) {
      this.Y = 0
    } else if (this.Y + SIZE_PADDLE >= window.game.height) {
      this.Y = window.game.height - SIZE_PADDLE
    }
  }

  /** Places the paddle against its side of the playfield, vertically centered, and resets its score. */
  init = () => {
    if (this.position === POSITION.RIGHT) {
      this.X = window.game.width - THICKNESS_PADDLE
    } else if (this.position === POSITION.LEFT) {
      this.X = 0
    }

    this.Y = (window.game.height - SIZE_PADDLE) / 2
    this.points = 0
  }
}
