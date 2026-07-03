import {
  BALL_COLOR, BALL_INITIAL_SPEED, BALL_RADIUS, POSITION,
} from './globalVariables.js'

/**
 * The pong ball: moves by its velocity each update, bounces off the top and
 * bottom walls, and triggers scoring when it crosses a side wall.
 */
export default class Ball {
  /** Creates a ball at the origin moving right; call init() to center it. */
  constructor() {
    this.radius = BALL_RADIUS
    this.X = 0
    this.Y = 0
    this.vX = BALL_INITIAL_SPEED
    this.vY = 0
  }

  /** Advances one step along the velocity vector and bounces off the top/bottom walls. */
  update = () => {
    this.X += this.vX
    this.Y += this.vY
    this.checkCollisionWithHorizontalWall()
  }

  /**
   * Renders the ball.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw = (ctx) => {
    ctx.fillStyle = BALL_COLOR
    ctx.beginPath()
    ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  /**
   * Scores a point for the opponent when the ball crosses a side wall.
   * Skipped when the ball bounced off a paddle this step.
   *
   * @param {boolean} collidePaddle True when the ball hit a paddle this step.
   */
  checkCollisionWithVerticalWall = (collidePaddle) => {
    if (!collidePaddle) {
      if (this.X - this.radius <= 0) {
        window.game.scorePoint(POSITION.LEFT)
      } else if (this.X + this.radius >= window.game.width) {
        window.game.scorePoint(POSITION.RIGHT)
      }
    }
  }

  /** Reverses vertical direction when touching the top or bottom wall. */
  checkCollisionWithHorizontalWall = () => {
    if (((this.Y - this.radius) <= 0) || ((this.Y + this.radius) >= window.game.height)) {
      this.vY = -this.vY
    }
  }

  /**
   * Rebounds off a paddle: reverses horizontal direction with a small
   * speed-up and deflects vertically by the bounce angle.
   *
   * @param {number} bounceAngle Angle in radians, negative-to-positive across the paddle's height.
   */
  changeDirection = (bounceAngle) => {
    if (this.vX < 0) {
      this.vX = -(this.vX + (-0.20) * Math.abs(Math.cos(bounceAngle)))
      this.vY += (1.00) * (-Math.sin(bounceAngle))
    } else {
      this.vY += (1.00) * (-Math.sin(bounceAngle))
      this.vX = -(this.vX + (0.20) * Math.abs(Math.cos(bounceAngle)))
    }
  }

  /**
   * Places the ball and resets its velocity to horizontal at initial speed.
   *
   * @param {number} initialX Starting X position in pixels.
   * @param {number} initialY Starting Y position in pixels.
   */
  init = (initialX, initialY) => {
    this.X = initialX
    this.Y = initialY
    this.vX = BALL_INITIAL_SPEED
    this.vY = 0
  }
}
