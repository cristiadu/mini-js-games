import { DIRECTION, SIZE_SNAKE, SNAKE_BODY_COLOR } from './globalVariables.js'

/**
 * One segment of the snake's body. Segments form a doubly linked list behind
 * the head; each update a segment adopts the direction its predecessor had on
 * the previous tick, which makes turns ripple down the body one cell at a time.
 */
export default class SnakeBody {
  /**
   * Creates a segment attached behind an existing part.
   *
   * @param {number} initialX Starting X position in pixels.
   * @param {number} initialY Starting Y position in pixels.
   * @param {SnakeBody|import('./SnakeHead.js').default} previous The part this segment follows (head or another segment).
   */
  constructor(initialX, initialY, previous) {
    this.next = null
    this.prev = previous
    this.direction = previous.direction
    this.lastDirection = previous.direction
    this.X = initialX
    this.Y = initialY
  }

  /** Moves one cell in the predecessor's previous direction, then updates the next segment. */
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

  /**
   * Renders this segment and, recursively, the rest of the tail.
   *
   * @param {CanvasRenderingContext2D} ctx Canvas 2D context.
   */
  draw(ctx) {
    ctx.fillStyle = SNAKE_BODY_COLOR
    ctx.fillRect(this.X, this.Y, SIZE_SNAKE, SIZE_SNAKE)
    if (this.next != null) {
      this.next.draw(ctx)
    }
  }

  /** Appends one segment at the tail, placed one cell behind the last segment's direction of travel. */
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
