import Keyboard from '../../../common/Keyboard.js'
import {
  KEYCODES, MAX_BOUNCE_ANGLE, PADDLE_COLOR, SIZE_PADDLE, SPEED_PADDLE, THICKNESS_PADDLE,
} from './globalVariables.js'

export default class Paddle {
  constructor() {
    this.X = 0
    this.Y = 0
  }

  update() {
    this.checkInput()
    this.checkCollisionWithWall()
  }

  draw(ctx) {
    ctx.fillStyle = PADDLE_COLOR
    ctx.fillRect(this.X, this.Y, SIZE_PADDLE, THICKNESS_PADDLE)
  }

  checkInput() {
    if (Keyboard.isDown(KEYCODES.left)) {
      this.X -= SPEED_PADDLE
    } else if (Keyboard.isDown(KEYCODES.right)) {
      this.X += SPEED_PADDLE
    }
  }

  // Used to calculate the angles
  getBounceAngle(intersectX) {
    // Y position relative to paddle height.
    const relativeIntersection = this.X + (SIZE_PADDLE / 2) - intersectX
    return (relativeIntersection / (SIZE_PADDLE / 2)) * MAX_BOUNCE_ANGLE
  }

  checkCollisionWithWall() {
    if (this.X <= 0) {
      this.X = 0
    } else if (this.X + SIZE_PADDLE >= window.game.width) {
      this.X = window.game.width - SIZE_PADDLE
    }
  }

  init(initialX, initialY) {
    this.X = initialX
    this.Y = initialY
  }
}
