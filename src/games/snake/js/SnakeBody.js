import { DIRECTION, SIZE_SNAKE, SNAKE_BODY_COLOR } from './globalVariables.js'

export default class SnakeBody {
  constructor(initialX, initialY, previous) {
    this.next = null
    this.prev = previous
    this.direction = previous.direction
    this.lastDirection = previous.direction
    this.X = initialX
    this.Y = initialY
  }

  update() {
    // Next element will get direction from before the update
    this.lastDirection = this.direction
    this.direction = this.prev.lastDirection

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

    if (this.next != null) {
      this.next.update()
    }
  }

  draw(ctx) {
    ctx.fillStyle = SNAKE_BODY_COLOR
    ctx.fillRect(this.X, this.Y, SIZE_SNAKE, SIZE_SNAKE)
    if (this.next != null) {
      this.next.draw(ctx)
    }
  }

  increase() {
    if (this.next != null) {
      this.next.increase()
    } else {
      switch (this.direction) {
        case DIRECTION.RIGHT:
          this.next = new SnakeBody(this.X - SIZE_SNAKE, this.Y, this)
          break
        case DIRECTION.LEFT:
          this.next = new SnakeBody(this.X + SIZE_SNAKE, this.Y, this)
          break
        case DIRECTION.UP:
          this.next = new SnakeBody(this.X, this.Y + SIZE_SNAKE, this)
          break
        case DIRECTION.DOWN:
          this.next = new SnakeBody(this.X, this.Y - SIZE_SNAKE, this)
          break
        default:
          this.next = new SnakeBody(this.X - SIZE_SNAKE, this.Y, this)
          break
      }
    }
  }
}
