import Keyboard from '../../../common/Keyboard.js'
import Food from './Food.js'
import SnakeHead from './SnakeHead.js'
import { ARROW_KEYS, DIRECTION, SCREEN_BACKGROUND_COLOR } from './globalVariables.js'

export default class SnakeGame {
  constructor(w, h) {
    this.width = w
    this.height = h
    this.snake = new SnakeHead()
    this.food = new Food()
  }

  update() {
    this.checkInput()
    this.food.update()
    this.snake.update()
  }

  /* eslint-disable no-unused-vars */
  draw(ctx, dt) {
    ctx.fillStyle = SCREEN_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)
    this.food.draw(ctx)
    this.snake.draw(ctx)
  }
  /* eslint-enable no-unused-vars */

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

  init() {
    this.snake.init()
    this.food.init()
  }

  gameIsOver() {
    this.machine.gameOver('Game Over')
  }
}
