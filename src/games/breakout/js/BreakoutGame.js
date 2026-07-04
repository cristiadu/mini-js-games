import Ball from './Ball.js'
import Block from './Block.js'
import Paddle from './Paddle.js'
import {
  NUM_LEVELS, NUM_LINES_BLOCKS, SIZE_PADDLE, SIZE_BLOCK, TEXT_COLOR, THICKNESS_BLOCK, THICKNESS_PADDLE,
  SCREEN_BACKGROUND_COLOR, GAME_LIVES,
} from './globalVariables.js'

/**
 * Breakout: bounce the ball off the paddle to clear the block grid before
 * running out of lives. Clearing a grid advances to the next level, which
 * adds one row of blocks; clearing the last level wins the game.
 * Implements the GameMachine contract (update/draw/init).
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
    this.level = 1
  }

  /**
   * Advances one fixed step: moves the ball and paddle, resolves collisions,
   * and ends the round through the machine on a loss (no lives left). When a
   * grid is cleared it advances to the next level, or wins the game after the
   * last one.
   */
  update = () => {
    this.ball.update()
    this.playerPaddle.update()
    const collidesPaddle = this.checkCollisionBallwithPaddle()
    const collidesBlock = this.checkCollisionBallwithBlock()
    this.ball.checkCollisionWithHorizontalWall(collidesPaddle || collidesBlock)

    if (this.activeBlocks <= 0) {
      if (this.level < NUM_LEVELS) {
        this.level += 1
        this.startLevel()
      } else {
        this.machine.gameOver('You won!')
      }
    } else if (this.lives <= 0) {
      this.machine.gameOver('You lost!')
    }
  }

  /* eslint-disable no-unused-vars */
  /**
   * Clears the playfield and renders the ball, paddle, remaining blocks and
   * the level/lives HUD line.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   * @param {number} dt Accumulator remainder in ms (unused).
   */
  draw = (ctx, dt) => {
    ctx.fillStyle = SCREEN_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)

    this.ball.draw(ctx)
    this.playerPaddle.draw(ctx)

    this.blocks.forEach((block) => {
      block.draw(ctx)
    })

    ctx.fillStyle = TEXT_COLOR
    ctx.font = '20px monospace'
    ctx.fillText(`Level ${this.level}/${NUM_LEVELS}  Lives ${this.lives}`, 12, this.height - 12)
  }
  /* eslint-enable no-unused-vars */

  /**
   * Bounces the ball off the paddle when a downward-moving ball overlaps it,
   * then rests the ball on the paddle's top so it cannot collide again on the
   * next step. A ball that has already fallen past the paddle is left alone
   * and drops out at the bottom.
   *
   * @returns {boolean} True when the ball hit the paddle this step.
   */
  checkCollisionBallwithPaddle = () => {
    let collides = false

    if ((this.ball.vY > 0)
      && ((this.ball.Y + this.ball.radius) >= this.playerPaddle.Y)
      && ((this.ball.Y - this.ball.radius) <= (this.playerPaddle.Y + THICKNESS_PADDLE))
      && (this.playerPaddle.X <= this.ball.X)
      && ((this.playerPaddle.X + SIZE_PADDLE) >= this.ball.X)) {
      const bounceAngle = this.playerPaddle.getBounceAngle(this.ball.X)
      this.ball.changeDirection(bounceAngle)
      this.ball.Y = this.playerPaddle.Y - this.ball.radius
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
  checkCollisionBallwithBlock = () => {
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

  /**
   * Builds the current level's block grid — the base number of rows plus one
   * per level past the first — and re-centers the ball for the serve.
   */
  startLevel = () => {
    const rows = NUM_LINES_BLOCKS + this.level - 1
    const columns = window.game.width / SIZE_BLOCK

    this.blocks = []
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const block = new Block()
        block.init(i, j)
        this.blocks.push(block)
      }
    }

    this.activeBlocks = rows * columns
    this.ball.init(window.game.width / 2, window.game.height / 2)
  }

  /** Resets the paddle, lives and level, and builds the first level's block grid (also runs on restart). */
  init = () => {
    const paddleInitialX = (window.game.width - SIZE_PADDLE) / 2
    const paddleInitialY = window.game.height - THICKNESS_PADDLE - 10
    this.playerPaddle.init(paddleInitialX, paddleInitialY)

    this.lives = GAME_LIVES
    this.level = 1
    this.startLevel()
  }
}
