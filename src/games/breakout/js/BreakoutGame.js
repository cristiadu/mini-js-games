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
    this.activeBlocks = 0
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

  /* eslint-disable no-unused-vars */
  draw(ctx, dt) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, this.width, this.height)

    this.ball.draw(ctx)
    this.playerPaddle.draw(ctx)

    Object.values(this.blocks).forEach((block) => {
      block.draw(ctx)
    })

    if (this.activeBlocks <= 0) {
      ctx.fillText('You won!', 25, 25)
    } else if (this.lives <= 0) {
      ctx.fillText('You lost!', 25, 25)
    }
  }
  /* eslint-enable no-unused-vars */

  checkCollisionBallwithPaddle() {
    let collides = false

    if (((this.ball.Y + this.ball.radius) >= this.playerPaddle.Y) && (this.playerPaddle.X <= this.ball.X)
      && ((this.playerPaddle.X + SIZE_PADDLE) >= this.ball.X)) {
      const bounceAngle = this.playerPaddle.getBounceAngle(this.ball.X)
      this.ball.changeDirection(bounceAngle)
      collides = true
    }

    return collides
  }

  checkCollisionBallwithBlock() {
    let collides = false

    for (const block of this.blocks) {
      if (block.show
        && (((this.ball.Y - this.ball.radius) <= block.Y + THICKNESS_BLOCK)
          && ((this.ball.Y - this.ball.radius) >= (block.Y)))
        && ((((this.ball.X - this.ball.radius) <= (block.X + SIZE_BLOCK))
          && ((this.ball.X - this.ball.radius) >= block.X))
          || (((this.ball.X + this.ball.radius) >= (block.X))
            && ((this.ball.X + this.ball.radius) <= (block.X + SIZE_BLOCK))))) {
        const bounceAngle = block.getBounceAngle(this.ball.X)
        this.ball.changeDirection(bounceAngle)
        collides = true
        block.show = false
        window.game.activeBlocks -= 1
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
    for (let i = 0; i < NUM_LINES_BLOCKS; i += 1) {
      for (j = 0; j < window.game.width / SIZE_BLOCK; j += 1) {
        this.blocks.push(new Block())
        this.blocks[i * (window.game.width / SIZE_BLOCK) + j].init(i, j)
      }
    }

    this.activeBlocks = NUM_LINES_BLOCKS * (window.game.width / SIZE_BLOCK)
  }
}
