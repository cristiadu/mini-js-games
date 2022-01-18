import { BALL_RADIUS, BALL_INITIAL_SPEED, BALL_COLOR } from './globalVariables.js'

export default class Ball {
  constructor() {
    this.radius = BALL_RADIUS
    this.initialX = 0
    this.initialY = 0
    this.X = 0
    this.Y = 0
    this.vX = 0
    this.vY = BALL_INITIAL_SPEED
  }

  update() {
    this.X += this.vX
    this.Y += this.vY
    this.checkCollisionWithVerticalWall()
  }

  draw(ctx) {
    ctx.fillStyle = BALL_COLOR
    ctx.beginPath()
    ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  checkCollisionWithHorizontalWall(collide) {
    // If didnt collide with block or paddle
    if (!collide) {
      if (this.Y - this.radius <= 0) {
        this.vY = -this.vY
      } else if (this.Y + this.radius >= window.game.height) {
        this.init(this.initialX, this.initialY)
        window.game.lives -= 1
      }
    }
  }

  checkCollisionWithVerticalWall() {
    // Means changing direction
    if (((this.X - this.radius) <= 0) || ((this.X + this.radius) >= window.game.width)) {
      this.vX = -this.vX
    }
  }

  changeDirection(bounceAngle) {
    // It hit a paddle, so increase speed.
    if (this.vY < 0) {
      this.vY = -(this.vY + (-0.20) * Math.abs(Math.cos(bounceAngle)))
      this.vX += (1.00) * (-Math.sin(bounceAngle))
    } else {
      this.vX += (1.00) * (-Math.sin(bounceAngle))
      this.vY = -(this.vY + (0.20) * Math.abs(Math.cos(bounceAngle)))
    }
  }

  init(initialX, initialY) {
    this.initialX = initialX
    this.initialY = initialY
    this.X = initialX
    this.Y = initialY
    this.vX = 0
    this.vY = BALL_INITIAL_SPEED
  }
}
