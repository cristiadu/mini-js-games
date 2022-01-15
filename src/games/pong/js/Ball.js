import { BALL_RADIUS, POSITION } from './globalVariables.js'

export default class Ball {
  constructor() {
    this.radius = BALL_RADIUS
    this.X = 0
    this.Y = 0
    this.vX = 3
    this.vY = 0
  }

  update() {
    this.X += this.vX
    this.Y += this.vY
    this.checkCollisionWithHorizontalWall()
  }

  draw(ctx) {
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  checkCollisionWithVerticalWall(collidePaddle) {
    // Means scoring a point
    if (!collidePaddle) {
      if (this.X - this.radius <= 0) {
        window.game.scorePoint(POSITION.LEFT)
      } else if (this.X + this.radius >= window.game.width) {
        window.game.scorePoint(POSITION.RIGHT)
      }
    }
  }

  checkCollisionWithHorizontalWall() {
    // Means changing direction
    if (((this.Y - this.radius) <= 0) || ((this.Y + this.radius) >= window.game.height)) {
      this.vY = -this.vY
    }
  }

  changeDirection(bounceAngle) {
    // It hit a paddle, so increase speed.
    if (this.vX < 0) {
      this.vX = -(this.vX + (-1.00) * Math.abs(Math.cos(bounceAngle)))
      this.vY += (1.00) * (-Math.sin(bounceAngle))
    } else {
      this.vY += (1.00) * (-Math.sin(bounceAngle))
      this.vX = -(this.vX + (1.00) * Math.abs(Math.cos(bounceAngle)))
    }
  }

  init() {
    this.X = window.game.width / 2
    this.Y = window.game.height / 2
    this.vX = 3
    this.vY = 0
  }
}
