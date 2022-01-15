import Ball from './Ball.js'
import Block from './Block.js'
import Paddle from './Paddle.js'
import {
  NUM_LINES_BLOCKS, SIZE_PADDLE, SIZE_BLOCK, THICKNESS_BLOCK,
} from './globalVariables.js'

export default class BreakoutGame {
  constructor(w, h) {
    this.width = w
    this.height = h
    this.playerPaddle = new Paddle()
    this.ball = new Ball()
    this.blocks = []
    this.lives = 3
    this.activeBlocks
  }

  update() {
    if ((this.activeBlocks > 0) && (this.lives > 0)) {
      this.ball.update()
      this.playerPaddle.update()
      const collides = this.checkCollisionBallwithPaddle()
      const collides2 = this.checkCollisionBallwithBlock()
      this.ball.checkCollisionWithHorizontalWall(collides && collides2)
    }
  }

  draw(ctx, dt) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, this.width, this.height)

    this.ball.draw(ctx, dt)
    this.playerPaddle.draw(ctx, dt)

    for (const i in this.blocks) {
      this.blocks[i].draw(ctx, dt)
    }

    if (this.activeBlocks <= 0) {
      ctx.fillText('You won!', 25, 25)
    } else if (this.lives <= 0) {
      ctx.fillText('You lost!', 25, 25)
    }
  }

  checkCollisionBallwithPaddle() {
    let collides = false

    if (((this.ball.Y + this.ball.radius) >= this.playerPaddle.Y) && (this.playerPaddle.X <= this.ball.X) && ((this.playerPaddle.X + SIZE_PADDLE) >= this.ball.X)) {
      const bounceAngle = this.playerPaddle.getBounceAngle(this.ball.X)
      this.ball.changeDirection(bounceAngle)
      collides = true
    }

    return collides
  }

  checkCollisionBallwithBlock() {
    const angle = 0
    let collides = false
    for (const i in this.blocks) {
      if ((this.blocks[i].show) && (((this.ball.Y - this.ball.radius) <= this.blocks[i].Y + THICKNESS_BLOCK) && ((this.ball.Y - this.ball.radius) >= (this.blocks[i].Y)))
        && ((((this.ball.X - this.ball.radius) <= (this.blocks[i].X + SIZE_BLOCK)) && ((this.ball.X - this.ball.radius) >= this.blocks[i].X))
          || (((this.ball.X + this.ball.radius) >= (this.blocks[i].X)) && ((this.ball.X + this.ball.radius) <= (this.blocks[i].X + SIZE_BLOCK))))) {
        const bounceAngle = this.blocks[i].getBounceAngle(this.ball.X)
        this.ball.changeDirection(bounceAngle)
        collides = true
        this.blocks[i].show = false
        game.activeBlocks--
        break
      }
    }

    return collides
  }

  init() {
    this.playerPaddle.init()
    this.ball.init()

    // Creating blocks
    let j = 0
    for (let i = 0; i < NUM_LINES_BLOCKS; i++) {
      for (j = 0; j < game.width / SIZE_BLOCK; j++) {
        this.blocks.push(new Block())
        this.blocks[i * (game.width / SIZE_BLOCK) + j].init(i, j)
      }
    }

    this.activeBlocks = NUM_LINES_BLOCKS * (game.width / SIZE_BLOCK)
  }
}
