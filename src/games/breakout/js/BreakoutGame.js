import Ball from './Ball.js'
import Block from './Block.js'
import Paddle from './Paddle.js'
import {
  NUM_LINES_BLOCKS, SIZE_PADDLE, SIZE_BLOCK, THICKNESS_BLOCK, THICKNESS_PADDLE, SCREEN_BACKGROUND_COLOR, GAME_LIVES,
} from './globalVariables.js'

/**
 * Breakout: bounce the ball off the paddle to clear the block grid before
 * running out of lives. Implements the GameMachine contract (update/draw/init).
 */
export default class BreakoutGame {
  /**
   * Creates the paddle, ball and an empty block grid; call init() before starting the loop.
   *
   * @param {number} w Playfield width in pixels.
   * @param {number} h Playfield height in pixels.
   */
  constructor(w, h) {
    this.width = w
    this.height = h
    this.playerPaddle = new Paddle()
    this.ball = new Ball()
    this.blocks = []
    this.lives = GAME_LIVES
    this.activeBlocks = 0
  }

  /**
   * Advances one fixed step: moves the ball and paddle, resolves collisions,
   * and ends the round through the machine on a win (no blocks left) or loss
   * (no lives left).
   */
  update() {
    this.ball.update()
    this.playerPaddle.update()
    const collidesPaddle = this.checkCollisionBallwithPaddle()
    const collidesBlock = this.checkCollisionBallwithBlock()
    this.ball.checkCollisionWithHorizontalWall(collidesPaddle || collidesBlock)

    if (this.activeBlocks <= 0) {
      this.machine.gameOver('You won!')
    } else if (this.lives <= 0) {
      this.machine.gameOver('You lost!')
    }
  }

  /* eslint-disable no-unused-vars */
  /**
   * Clears the playfield and renders the ball, paddle and remaining blocks.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   * @param {number} dt Accumulator remainder in ms (unused).
   */
  draw(ctx, dt) {
    ctx.fillStyle = SCREEN_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)

    this.ball.draw(ctx)
    this.playerPaddle.draw(ctx)

    this.blocks.forEach((block) => {
      block.draw(ctx)
    })
  }
  /* eslint-enable no-unused-vars */

  /**
   * Bounces the ball off the paddle when they intersect.
   *
   * @returns {boolean} True when the ball hit the paddle this step.
   */
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

  /**
   * Bounces the ball off the first visible block it intersects, hiding that
   * block and decrementing the active count.
   *
   * @returns {boolean} True when the ball hit a block this step.
   */
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

  /** Resets the paddle, ball and lives, and rebuilds the full block grid (also runs on restart). */
  init() {
    const paddleInitialX = window.game.width / 2
    const paddleInitialY = window.game.height - THICKNESS_PADDLE - 10
    this.playerPaddle.init(paddleInitialX, paddleInitialY)

    const ballInitialX = window.game.width / 2
    const ballInitialY = window.game.height / 2
    this.ball.init(ballInitialX, ballInitialY)

    this.lives = GAME_LIVES

    this.blocks = []
    for (let i = 0; i < NUM_LINES_BLOCKS; i += 1) {
      for (let j = 0; j < window.game.width / SIZE_BLOCK; j += 1) {
        this.blocks.push(new Block())
        this.blocks[i * (window.game.width / SIZE_BLOCK) + j].init(i, j)
      }
    }

    this.activeBlocks = NUM_LINES_BLOCKS * (window.game.width / SIZE_BLOCK)
  }
}
