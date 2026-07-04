import Keyboard from '../../../common/Keyboard.js'
import Food from './Food.js'
import SnakeHead from './SnakeHead.js'
import {
  CONTROLS, DIRECTION, SCREEN_BACKGROUND_COLOR, WIN_LENGTH,
} from './globalVariables.js'

/**
 * Arrow-key snake: eat food to grow, die on self or wall collision, win by
 * reaching WIN_LENGTH segments.
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

  /** Advances one fixed step: applies input, moves the food timer and the snake, then checks for the win. */
  update = () => {
    this.checkInput()
    this.food.update()
    this.snake.update()
    this.checkWin()
  }

  /**
   * Ends the round with a win once the snake has reached the winning length.
   * Skipped when the round already ended this step (dying takes precedence
   * over growing on the same move).
   */
  checkWin = () => {
    if (this.machine.gameOverMessage !== '') {
      return
    }

    let length = 1
    for (let part = this.snake.body; part != null; part = part.next) {
      length += 1
    }

    if (length >= WIN_LENGTH) {
      this.machine.gameOver('You won!')
    }
  }

  /* eslint-disable no-unused-vars */
  /**
   * Clears the playfield and renders the food and the snake.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   * @param {number} dt Accumulator remainder in ms (unused).
   */
  draw = (ctx, dt) => {
    ctx.fillStyle = SCREEN_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)
    this.food.draw(ctx)
    this.snake.draw(ctx)
  }
  /* eslint-enable no-unused-vars */

  /** Polls the arrow keys and turns the snake, disallowing 180-degree reversals. */
  checkInput = () => {
    let direction = null
    if (Keyboard.isDown(CONTROLS.left) && (this.snake.direction !== DIRECTION.RIGHT)) {
      direction = DIRECTION.LEFT
    } else if (Keyboard.isDown(CONTROLS.right) && (this.snake.direction !== DIRECTION.LEFT)) {
      direction = DIRECTION.RIGHT
    } else if (Keyboard.isDown(CONTROLS.down) && (this.snake.direction !== DIRECTION.UP)) {
      direction = DIRECTION.DOWN
    } else if (Keyboard.isDown(CONTROLS.up) && (this.snake.direction !== DIRECTION.DOWN)) {
      direction = DIRECTION.UP
    }

    if (direction != null) {
      this.snake.changeDirection(direction)
    }
  }

  /** Resets the snake to its starting position/length and spawns fresh food. */
  init = () => {
    this.snake.init()
    this.food.init()
  }

  /** Ends the round; the machine shows the game-over overlay and handles restart. */
  gameIsOver = () => {
    this.machine.gameOver('Game Over')
  }
}
