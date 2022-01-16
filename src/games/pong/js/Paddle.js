import Keyboard from '../../../common/Keyboard.js'
import {
  KEYCODES, MAX_BOUNCE_ANGLE, PADDLE_COLOR, PLAYER_TYPE, POSITION, REDUCED_SPEED_AI, SIZE_PADDLE, SPEED_PADDLE, THICKNESS_PADDLE,
} from './globalVariables.js'

export default class Paddle {
  constructor(pos, pType) {
    this.playerType = pType
    this.position = pos
    this.X = 0
    this.Y = 0
    this.points = 0
  }

  update() {
    if (this.playerType === PLAYER_TYPE.AI) {
      this.moveAI()
    } else {
      this.checkInput()
    }

    this.checkCollisionWithWall()
  }

  draw(ctx) {
    ctx.fillStyle = PADDLE_COLOR
    ctx.fillRect(this.X, this.Y, THICKNESS_PADDLE, SIZE_PADDLE)
  }

  checkInput() {
    if (this.playerType === PLAYER_TYPE.HUMAN) {
      if (Keyboard.isDown(KEYCODES.down)) {
        this.Y += SPEED_PADDLE
      } else if (Keyboard.isDown(KEYCODES.up)) {
        this.Y -= SPEED_PADDLE
      }
    } else if (this.playerType === PLAYER_TYPE.HUMAN2) {
      if (Keyboard.isDown(KEYCODES.w)) {
        this.Y -= SPEED_PADDLE
      } else if (Keyboard.isDown(KEYCODES.s)) {
        this.Y += SPEED_PADDLE
      }
    }
  }

  moveAI() {
    if ((this.Y + SIZE_PADDLE / 2) > window.game.ball.Y) {
      this.Y -= REDUCED_SPEED_AI
    } else if ((this.Y + SIZE_PADDLE / 2) < window.game.ball.Y) {
      this.Y += REDUCED_SPEED_AI
    }
  }

  // Used to calculate the angles
  getBounceAngle(intersectY) {
    const relativeIntersection = this.Y + (SIZE_PADDLE / 2) - intersectY
    return (relativeIntersection / (SIZE_PADDLE / 2)) * MAX_BOUNCE_ANGLE
  }

  checkCollisionWithWall() {
    if (this.Y <= 0) {
      this.Y = 0
    } else if (this.Y + SIZE_PADDLE >= window.game.height) {
      this.Y = window.game.height - SIZE_PADDLE
    }
  }

  init() {
    if (this.position === POSITION.RIGHT) {
      this.X = window.game.width - THICKNESS_PADDLE
      this.Y = window.game.height / 2
    } else if (this.position === POSITION.LEFT) {
      this.X = 0
      this.Y = window.game.height / 2
    }

    this.points = 0
  }
}
