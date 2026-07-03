import getRandomInt from './utils.js'
import {
  FOOD_COLOR, FOOD_SIZE, SIZE_SNAKE, TIMEOUT_FOOD,
} from './globalVariables.js'

/**
 * The food pellet. Respawns at a random snake-free position when eaten or
 * after sitting uneaten for TIMEOUT_FOOD updates.
 */
export default class Food {
  /** Creates an unplaced pellet; call init() (or generateFood()) to position it. */
  constructor() {
    this.X = 0
    this.Y = 0
    this.elapsedTime = 0
  }

  /** Counts one update tick and respawns the pellet once it has sat uneaten too long. */
  update() {
    this.elapsedTime += 1
    if (this.elapsedTime >= TIMEOUT_FOOD) {
      this.generateFood()
    }
  }

  /**
   * Renders the pellet.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw(ctx) {
    ctx.fillStyle = FOOD_COLOR
    ctx.fillRect(this.X, this.Y, FOOD_SIZE, FOOD_SIZE)
  }

  /** Moves the pellet to a random in-bounds position that does not overlap the snake. */
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

  /**
   * Reports whether a candidate pellet position would overlap any part of the snake.
   *
   * @param {number} x Candidate X position in pixels.
   * @param {number} y Candidate Y position in pixels.
   * @returns {boolean} True when the position intersects the head or any body segment.
   */
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

  /** Places the pellet for a fresh round. */
  init() {
    this.generateFood()
  }
}
