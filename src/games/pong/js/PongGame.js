import Ball from './Ball.js'
import Paddle from './Paddle.js'
import {
  PLAYER_TYPE, POSITION, SCREEN_BACKGROUND_COLOR, SIZE_PADDLE, TEXT_COLOR, THICKNESS_PADDLE,
} from './globalVariables.js'

export default class PongGame {
  constructor(w, h) {
    this.width = w
    this.height = h
    this.player1Paddle = new Paddle(POSITION.LEFT, PLAYER_TYPE.HUMAN)
    this.player2Paddle = new Paddle(POSITION.RIGHT, PLAYER_TYPE.AI)
    this.ball = new Ball()
  }

  update() {
    this.ball.update()
    this.player1Paddle.update()
    this.player2Paddle.update()
    const collidePaddle = this.checkCollisionBallwithPaddle()
    this.ball.checkCollisionWithVerticalWall(collidePaddle)
  }

  /* eslint-disable no-unused-vars */
  draw(ctx, dt) {
    ctx.fillStyle = SCREEN_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)

    this.ball.draw(ctx)
    this.player1Paddle.draw(ctx)
    this.player2Paddle.draw(ctx)

    ctx.fillStyle = TEXT_COLOR
    ctx.font = '48px Monospace'
    ctx.fillText(`${this.player1Paddle.points} X ${this.player2Paddle.points}`, (window.game.width - 100) / 2, 50)
  }
  /* eslint-enable no-unused-vars */

  checkCollisionBallwithPaddle() {
    let collides = false

    if (((this.ball.X + this.ball.radius) >= this.player2Paddle.X) && (this.player2Paddle.Y <= this.ball.Y)
      && ((this.player2Paddle.Y + SIZE_PADDLE) >= this.ball.Y)) {
      const bounceAngle = this.player1Paddle.getBounceAngle(this.ball.Y)
      this.ball.changeDirection(bounceAngle)
      collides = true
    } else if (((this.ball.X - this.ball.radius) <= (this.player1Paddle.X + THICKNESS_PADDLE))
      && (this.player1Paddle.Y <= this.ball.Y) && ((this.player1Paddle.Y + SIZE_PADDLE) >= this.ball.Y)) {
      const bounceAngle = this.player2Paddle.getBounceAngle(this.ball.Y)
      this.ball.changeDirection(bounceAngle)
      collides = true
    }

    return collides
  }

  scorePoint(pos) {
    if (pos === POSITION.LEFT) {
      this.player2Paddle.points += 1
    } else if (pos === POSITION.RIGHT) {
      this.player1Paddle.points += 1
    }

    this.ball.init(this.width / 2, this.height / 2)
  }

  init() {
    this.player1Paddle.init()
    this.player2Paddle.init()
    this.ball.init(this.width / 2, this.height / 2)
  }
}
