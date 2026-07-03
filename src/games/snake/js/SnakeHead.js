import SnakeBody from './SnakeBody.js'
import {
  DIRECTION, FOOD_SIZE, SIZE_SNAKE, SNAKE_HEAD_COLOR, SNAKE_INITIAL_X, SNAKE_INITIAL_Y,
} from './globalVariables.js'

/**
 * The snake's head: moves one cell per update in the current direction,
 * eats food, and detects self/wall collisions. The rest of the snake hangs
 * off it as a linked list of SnakeBody segments (via this.body).
 */
export default class SnakeHead {
  /** Creates a head at the starting cell, moving right; call init() to attach the body. */
  constructor() {
    this.body = null
    this.direction = DIRECTION.RIGHT
    this.lastDirection = DIRECTION.RIGHT
    this.X = SNAKE_INITIAL_X
    this.Y = SNAKE_INITIAL_Y
  }

  /**
   * Advances one cell in the current direction, grows and respawns the food if
   * eating, propagates movement down the body, then checks collisions.
   */
  update = () => {
    switch (this.direction) {
      case DIRECTION.RIGHT:
        this.X += SIZE_SNAKE
        break
      case DIRECTION.LEFT:
        this.X -= SIZE_SNAKE
        break
      case DIRECTION.UP:
        this.Y -= SIZE_SNAKE
        break
      case DIRECTION.DOWN:
        this.Y += SIZE_SNAKE
        break
      default:
        this.X += SIZE_SNAKE
        break
    }

    if (this.isEatingFood()) {
      this.body.increase()
      window.game.food.generateFood()
    }

    this.body.update()
    this.lastDirection = this.direction
    this.checkBodyCollision()
    this.checkWallCollision()
  }

  /**
   * Renders the head and, recursively, every body segment.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw = (ctx) => {
    ctx.fillStyle = SNAKE_HEAD_COLOR
    ctx.fillRect(this.X, this.Y, SIZE_SNAKE, SIZE_SNAKE)
    this.body.draw(ctx)
  }

  /** Resets position/direction and rebuilds the body at its starting length. */
  init = () => {
    this.X = SNAKE_INITIAL_X
    this.Y = SNAKE_INITIAL_Y
    this.direction = DIRECTION.RIGHT
    this.lastDirection = DIRECTION.RIGHT

    // Setting first element from body, and increasing its size to get 3 blocks in the beginning of the game
    this.body = new SnakeBody(this.X - SIZE_SNAKE, this.Y, this)
    this.body.increase()
  }

  /** Ends the game if the head overlaps any body segment. */
  checkBodyCollision = () => {
    let part = this.body
    while (part != null) {
      if (this.X < part.X + SIZE_SNAKE && this.X + SIZE_SNAKE > part.X && this.Y < part.Y + SIZE_SNAKE && SIZE_SNAKE + this.Y > part.Y) {
        window.game.gameIsOver()
        break
      }
      part = part.next
    }
  }

  /** Ends the game if the head has left the playfield. */
  checkWallCollision = () => {
    if (this.X < 0 || this.Y < 0 || this.X + SIZE_SNAKE > window.game.width || this.Y + SIZE_SNAKE > window.game.height) {
      window.game.gameIsOver()
    }
  }

  /**
   * Turns the head, remembering the previous direction for the body to follow.
   *
   * @param {string} updatedDirection One of the DIRECTION values.
   */
  changeDirection = (updatedDirection) => {
    this.lastDirection = this.direction
    this.direction = updatedDirection
  }

  /**
   * Reports whether the head currently overlaps the food.
   *
   * @returns {boolean} True when the head and food rectangles intersect.
   */
  isEatingFood = () => {
    if (this.X < window.game.food.X + FOOD_SIZE && this.X + SIZE_SNAKE > window.game.food.X
      && this.Y < window.game.food.Y + FOOD_SIZE && SIZE_SNAKE + this.Y > window.game.food.Y) {
      return true
    }

    return false
  }
}
