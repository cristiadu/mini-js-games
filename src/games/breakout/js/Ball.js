import { BALL_RADIUS, BALL_INITIAL_SPEED, BALL_COLOR } from './globalVariables.js'

/**
 * The breakout ball: moves by its velocity each update, bounces off the side
 * walls and the top, and costs a life when it falls past the bottom edge.
 */
export default class Ball {
  /** Creates a ball at the origin moving straight down; call init() to position it. */
  constructor() {
    this.radius = BALL_RADIUS
    this.initialX = 0
    this.initialY = 0
    this.X = 0
    this.Y = 0
    this.vX = 0
    this.vY = BALL_INITIAL_SPEED
  }

  /** Advances one step along the velocity vector and bounces off the side walls. */
  update = () => {
    this.X += this.vX
    this.Y += this.vY
    this.checkCollisionWithVerticalWall()
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
   * Handles the top and bottom edges: bounces off the top, and on falling past
   * the bottom resets the ball and deducts a life. Skipped when the ball
   * already bounced off the paddle or a block this step.
   *
   * @param {boolean} collide True when the ball hit the paddle or a block this step.
   */
  checkCollisionWithHorizontalWall = (collide) => {
    if (!collide) {
      if (this.Y - this.radius <= 0) {
        this.vY = -this.vY
      } else if (this.Y + this.radius >= window.game.height) {
        this.init(this.initialX, this.initialY)
        window.game.lives -= 1
      }
    }
  }

  /** Reverses horizontal direction when touching the left or right wall. */
  checkCollisionWithVerticalWall = () => {
    if (((this.X - this.radius) <= 0) || ((this.X + this.radius) >= window.game.width)) {
      this.vX = -this.vX
    }
  }

  /**
   * Rebounds off the paddle or a block: reverses vertical direction with a
   * small speed-up and deflects horizontally by the bounce angle.
   *
   * @param {number} bounceAngle Angle in radians, negative-to-positive across the surface's width.
   */
  changeDirection = (bounceAngle) => {
    if (this.vY < 0) {
      this.vY = -(this.vY + (-0.20) * Math.abs(Math.cos(bounceAngle)))
      this.vX += (1.00) * (-Math.sin(bounceAngle))
    } else {
      this.vX += (1.00) * (-Math.sin(bounceAngle))
      this.vY = -(this.vY + (0.20) * Math.abs(Math.cos(bounceAngle)))
    }
  }

  /**
   * Places the ball and resets its velocity to straight down at initial speed.
   * The position is remembered for the reset after a lost life.
   *
   * @param {number} initialX Starting X position in pixels.
   * @param {number} initialY Starting Y position in pixels.
   */
  init = (initialX, initialY) => {
    this.initialX = initialX
    this.initialY = initialY
    this.X = initialX
    this.Y = initialY
    this.vX = 0
    this.vY = BALL_INITIAL_SPEED
  }
}
