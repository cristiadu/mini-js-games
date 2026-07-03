import Keyboard from '../../../common/Keyboard.js'
import {
  KEYS, MAX_BOUNCE_ANGLE, PADDLE_COLOR, PLAYER_TYPE, POSITION, REDUCED_SPEED_AI, SIZE_PADDLE, SPEED_PADDLE, THICKNESS_PADDLE,
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
  update() {
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
  draw(ctx) {
    ctx.fillStyle = PADDLE_COLOR
    ctx.fillRect(this.X, this.Y, THICKNESS_PADDLE, SIZE_PADDLE)
  }

  /** Moves up/down from keyboard input: arrows for HUMAN, W/S for HUMAN2. */
  checkInput() {
    if (this.playerType === PLAYER_TYPE.HUMAN) {
      if (Keyboard.isDown(KEYS.down)) {
        this.Y += SPEED_PADDLE
      } else if (Keyboard.isDown(KEYS.up)) {
        this.Y -= SPEED_PADDLE
      }
    } else if (this.playerType === PLAYER_TYPE.HUMAN2) {
      if (Keyboard.isDown(KEYS.w)) {
        this.Y -= SPEED_PADDLE
      } else if (Keyboard.isDown(KEYS.s)) {
        this.Y += SPEED_PADDLE
      }
    }
  }

  /** Tracks the ball at reduced speed so the AI stays beatable. */
  moveAI() {
    if ((this.Y + SIZE_PADDLE / 2) > window.game.ball.Y) {
      this.Y -= REDUCED_SPEED_AI
    } else if ((this.Y + SIZE_PADDLE / 2) < window.game.ball.Y) {
      this.Y += REDUCED_SPEED_AI
    }
  }

  /**
   * Computes the rebound angle for a ball hit, based on how far from the
   * paddle's center it struck: 0 at the center up to ±MAX_BOUNCE_ANGLE at the edges.
   *
   * @param {number} intersectY Y position where the ball hit, in pixels.
   * @returns {number} Bounce angle in radians.
   */
  getBounceAngle(intersectY) {
    const relativeIntersection = this.Y + (SIZE_PADDLE / 2) - intersectY
    return (relativeIntersection / (SIZE_PADDLE / 2)) * MAX_BOUNCE_ANGLE
  }

  /** Clamps the paddle inside the playfield's top and bottom edges. */
  checkCollisionWithWall() {
    if (this.Y <= 0) {
      this.Y = 0
    } else if (this.Y + SIZE_PADDLE >= window.game.height) {
      this.Y = window.game.height - SIZE_PADDLE
    }
  }

  /** Places the paddle against its side of the playfield, vertically centered, and resets its score. */
  init() {
    if (this.position === POSITION.RIGHT) {
      this.X = window.game.width - THICKNESS_PADDLE
      this.Y = window.game.height / 2
    } else if (this.position === POSITION.LEFT) {
      this.X = 0
      this.Y = window.game.height / 2
    }

    this.points = 0
  }
}
