import SnakeBody from './SnakeBody.js'
import { DIRECTION, FOOD_SIZE, SIZE_SNAKE } from './globalVariables.js'

export default class SnakeHead {
  constructor() {
    this.body = null
    this.direction = DIRECTION.RIGHT
    this.lastDirection = DIRECTION.RIGHT
    this.X = 2
    this.Y = 2
  }

  update() {
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

  draw(ctx) {
    ctx.fillStyle = '#00AA00'
    ctx.fillRect(this.X, this.Y, SIZE_SNAKE, SIZE_SNAKE)
    this.body.draw(ctx)
  }

  init() {
    this.X = 2
    this.Y = 2
    this.direction = DIRECTION.RIGHT
    this.lastDirection = DIRECTION.RIGHT

    // Setting first element from body, and increasing its size to get 3 blocks in the beginning of the game
    this.body = new SnakeBody(this.X - SIZE_SNAKE, this.Y, this)
    this.body.increase()
  }

  checkBodyCollision() {
    let part = this.body
    while (part != null) {
      if (this.X < part.X + SIZE_SNAKE && this.X + SIZE_SNAKE > part.X && this.Y < part.Y + SIZE_SNAKE && SIZE_SNAKE + this.Y > part.Y) {
        window.game.gameIsOver()
        break
      }
      part = part.next
    }
  }

  checkWallCollision() {
    if ((this.X < 0) || (this.Y < 0) || ((this.X + SIZE_SNAKE) > window.game.width) || ((this.Y + SIZE_SNAKE) > window.game.height)) {
      window.game.gameIsOver()
    }
  }

  changeDirection(updatedDirection) {
    this.lastDirection = this.direction
    this.direction = updatedDirection
  }

  isEatingFood() {
    if (this.X < window.game.food.X + FOOD_SIZE && this.X + SIZE_SNAKE > window.game.food.X
      && this.Y < window.game.food.Y + FOOD_SIZE && SIZE_SNAKE + this.Y > window.game.food.Y) {
      return true
    }

    return false
  }
}
