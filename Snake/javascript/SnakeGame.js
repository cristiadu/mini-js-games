class SnakeGame {
  constructor(w, h) {
    this.width = w
    this.height = h
    this.snake = new SnakeHead()
    this.food = new Food()
    this.gameOver = false
  }

  update() {
    this.checkInput();
    if (!this.gameOver) {
      this.food.update()
      this.snake.update()
    }
  }

  draw(ctx, dt) {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, this.width, this.height)
    this.food.draw(ctx, dt)
    this.snake.draw(ctx, dt)

    if (this.gameOver) {
      ctx.fillText("Game Over, press ESC if you want to restart.", 25, 25)
    }
  }

  checkInput() {
    var direction = null;
    if (!this.gameOver) {
      if (Keyboard.isDown(ARROWS_KEYCODES.left) && (this.snake.direction != DIRECTION.RIGHT)) {
        direction = DIRECTION.LEFT
      } else if (Keyboard.isDown(ARROWS_KEYCODES.right) && (this.snake.direction != DIRECTION.LEFT)) {
        direction = DIRECTION.RIGHT
      } else if (Keyboard.isDown(ARROWS_KEYCODES.down) && (this.snake.direction != DIRECTION.UP)) {
        direction = DIRECTION.DOWN
      } else if (Keyboard.isDown(ARROWS_KEYCODES.up) && (this.snake.direction != DIRECTION.DOWN)) {
        direction = DIRECTION.UP
      }

      if (direction != null) {
        this.snake.changeDirection(direction)
      }
    }
    else if (Keyboard.isDown(27)) {
      // ESC key was pressed, reset game.
      this.init()
    }

  }

  init() {
    this.gameOver = false
    this.snake.init()
    this.food.init()
  }

  gameIsOver() {
    this.gameOver = true
  }
}
