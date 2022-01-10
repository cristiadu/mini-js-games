class Ball {
  constructor() {
    this.radius = BALL_RADIUS
    this.X = 0
    this.Y = 0
    this.vX = 0
    this.vY = 3
  }

  update() {
    this.X += this.vX
    this.Y += this.vY
    this.checkCollisionWithVerticalWall()
  }

  draw(ctx, dt) {
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  checkCollisionWithHorizontalWall(collide) {
    // If didnt collide with block or paddle
    if (!collide) {
      if (this.Y - this.radius <= 0) {
        this.vY = -this.vY
      } else if (this.Y + this.radius >= game.height) {
        this.init()
        game.lives--
      }
    }
  }

  checkCollisionWithVerticalWall() {
    // Means changing direction
    if (((this.X - this.radius) <= 0) || ((this.X + this.radius) >= game.width)) {
      this.vX = -this.vX
    }
  }

  changeDirection(bounceAngle) {
    // It hit a paddle, so increase speed.
    if (this.vY < 0) {
      this.vY = -(this.vY + (-1.00) * Math.abs(Math.cos(bounceAngle)))
      this.vX = (this.vX + (1.00) * (-Math.sin(bounceAngle)))
    } else {
      this.vX = (this.vX + (1.00) * (-Math.sin(bounceAngle)))
      this.vY = -(this.vY + (1.00) * Math.abs(Math.cos(bounceAngle)))
    }
  }

  init() {
    this.X = game.width / 2
    this.Y = game.height / 2
    this.vX = 0
    this.vY = 3
  }
}
