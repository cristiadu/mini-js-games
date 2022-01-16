import getRandomInt from './utils.js'
import {
  FOOD_COLOR, FOOD_SIZE, SIZE_SNAKE, TIMEOUT_FOOD,
} from './globalVariables.js'

export default class Food {
  constructor() {
    this.X = 0
    this.Y = 0
    this.elapsedTime = 0
  }

  update() {
    this.elapsedTime += 1
    if (this.elapsedTime >= TIMEOUT_FOOD) {
      this.generateFood()
    }
  }

  draw(ctx) {
    ctx.fillStyle = FOOD_COLOR
    ctx.fillRect(this.X, this.Y, FOOD_SIZE, FOOD_SIZE)
  }

  generateFood() {
    let randomX; let
      randomY
    let inSnake = true
    let part = window.game.snake

    while (inSnake) {
      randomX = getRandomInt(0, window.game.width)
      randomY = getRandomInt(0, window.game.height)
      if (part.X < randomX + FOOD_SIZE && part.X + SIZE_SNAKE > randomX && part.Y < randomY + FOOD_SIZE && SIZE_SNAKE + part.Y > randomY) {
        /* eslint-disable no-continue */
        continue
        /* eslint-enable no-continue */
      } else {
        part = part.body
      }

      while (part != null) {
        if (part.X < randomX + FOOD_SIZE && part.X + SIZE_SNAKE > randomX && part.Y < randomY + FOOD_SIZE
          && SIZE_SNAKE + part.Y > randomY) {
          break
        } else {
          part = part.next
        }
      }

      if (part == null) {
        inSnake = false
      }
    }

    this.X = randomX
    this.Y = randomY
    this.elapsedTime = 0
  }

  init() {
    this.generateFood()
  }
}
