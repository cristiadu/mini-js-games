class Food {
  constructor() {
    this.X = 0
    this.Y = 0
    this.elapsedTime = 0
  }

  update() {
    this.elapsedTime++
    if (this.elapsedTime >= TIMEOUT_FOOD) {
      this.generateFood()
    }
  }

  draw(ctx, dt) {
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(this.X, this.Y, FOOD_SIZE, FOOD_SIZE)
  }

  generateFood() {
    var randomX, randomY
    var inSnake = true
    var part = game.snake

    while (inSnake) {
      randomX = getRandomInt(0, game.width)
      randomY = getRandomInt(0, game.height)
      if (part.X < randomX + FOOD_SIZE && part.X + SIZE_SNAKE > randomX && part.Y < randomY + FOOD_SIZE && SIZE_SNAKE + part.Y > randomY) {
        continue
      } else {
        part = part.body
      }

      while (part != null) {
        if (part.X < randomX + FOOD_SIZE && part.X + SIZE_SNAKE > randomX && part.Y < randomY + FOOD_SIZE && SIZE_SNAKE + part.Y > randomY) {
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
