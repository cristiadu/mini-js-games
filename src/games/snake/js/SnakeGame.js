import Keyboard from '../../../common/Keyboard.js'
import Food from './Food.js'
import SnakeHead from './SnakeHead.js'
import { ARROW_KEYS, DIRECTION, SCREEN_BACKGROUND_COLOR } from './globalVariables.js'

/**
 * Arrow-key snake: eat food to grow, die on self or wall collision.
 * Implements the GameMachine contract (update/draw/init).
 */
export default class SnakeGame {
  /**
   * Creates the snake and its food; call init() before starting the loop.
   *
   * @param {number} w Playfield width in pixels.
   * @param {number} h Playfield height in pixels.
   */
  constructor(w, h) {
    this.width = w
    this.height = h
    this.snake = new SnakeHead()
    this.food = new Food()
  }

  /** Advances one fixed step: applies input, then moves the food timer and the snake. */
  update() {
    this.checkInput()
    this.food.update()
    this.snake.update()
  }

  /* eslint-disable no-unused-vars */
  /**
   * Clears the playfield and renders the food and the snake.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   * @param {number} dt Accumulator remainder in ms (unused).
   */
  draw(ctx, dt) {
    ctx.fillStyle = SCREEN_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)
    this.food.draw(ctx)
    this.snake.draw(ctx)
  }
  /* eslint-enable no-unused-vars */

  /** Polls the arrow keys and turns the snake, disallowing 180-degree reversals. */
  checkInput() {
    let direction = null
    if (Keyboard.isDown(ARROW_KEYS.left) && (this.snake.direction !== DIRECTION.RIGHT)) {
      direction = DIRECTION.LEFT
    } else if (Keyboard.isDown(ARROW_KEYS.right) && (this.snake.direction !== DIRECTION.LEFT)) {
      direction = DIRECTION.RIGHT
    } else if (Keyboard.isDown(ARROW_KEYS.down) && (this.snake.direction !== DIRECTION.UP)) {
      direction = DIRECTION.DOWN
    } else if (Keyboard.isDown(ARROW_KEYS.up) && (this.snake.direction !== DIRECTION.DOWN)) {
      direction = DIRECTION.UP
    }

    if (direction != null) {
      this.snake.changeDirection(direction)
    }
  }

  /** Resets the snake to its starting position/length and spawns fresh food. */
  init() {
    this.snake.init()
    this.food.init()
  }

  /** Ends the round; the machine shows the game-over overlay and handles restart. */
  gameIsOver() {
    this.machine.gameOver('Game Over')
  }
}
