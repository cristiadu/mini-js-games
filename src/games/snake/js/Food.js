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
    let randomX
    let randomY

    do {
      randomX = getRandomInt(0, window.game.width - FOOD_SIZE)
      randomY = getRandomInt(0, window.game.height - FOOD_SIZE)
    } while (this.overlapsSnake(randomX, randomY))

    this.X = randomX
    this.Y = randomY
    this.elapsedTime = 0
  }

  overlapsSnake(x, y) {
    const overlapsPart = (part) => part.X < x + FOOD_SIZE && part.X + SIZE_SNAKE > x
      && part.Y < y + FOOD_SIZE && part.Y + SIZE_SNAKE > y

    const head = window.game.snake
    if (overlapsPart(head)) {
      return true
    }

    for (let part = head.body; part != null; part = part.next) {
      if (overlapsPart(part)) {
        return true
      }
    }

    return false
  }

  init() {
    this.generateFood()
  }
}
