import Keyboard from './Keyboard.js'

const PAUSE_KEY = 'KeyP'
const RESTART_KEY = 'Escape'

const OVERLAY_BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.6)'
const OVERLAY_TEXT_COLOR = '#FFF'

const STATES = {
  PLAYING: 0,
  STOPPED: 1,
  PAUSED: 2,
  GAME_OVER: 3,
}

export default class GameMachine {
  constructor(game, cfg, selector) {
    this.game = game
    this.game.machine = this
    this.gameCanvas = document.querySelector(selector)
    this.context = this.gameCanvas.getContext('2d')
    this.now = 0
    this.elapsed = 0
    this.last = performance.now()
    this.fps = cfg.fps || 60
    this.dStep = 1000 / this.fps
    this.accumulator = 0
    this.state = STATES.STOPPED
    this.gameOverMessage = ''
    this.pauseKeyWasDown = false

    this.width = cfg.width
    this.height = cfg.height

    this.gameCanvas.width = cfg.width
    this.gameCanvas.height = cfg.height

    this.step = () => {
      this.now = performance.now()
      this.elapsed = this.now - this.last
      this.last = this.now

      this.handleStateInput()

      if (this.state === STATES.PLAYING) {
        this.accumulator += Math.min(1000, this.elapsed)

        // A game.update() may end the game mid-tick, so re-check the state
        while (this.state === STATES.PLAYING && this.accumulator >= this.dStep) {
          this.game.update()
          this.accumulator -= this.dStep
        }
      }

      this.game.draw(this.context, this.accumulator)

      if (this.state === STATES.PAUSED) {
        this.drawOverlay('Paused', 'Press P to resume')
      } else if (this.state === STATES.GAME_OVER) {
        this.drawOverlay(this.gameOverMessage, 'Press ESC to restart')
      }

      if (this.state !== STATES.STOPPED) {
        requestAnimationFrame(this.step)
      }
    }
  }

  start = () => {
    this.state = STATES.PLAYING
    this.last = performance.now()
    this.step()
  }

  // Ends the current round; the machine freezes updates, shows the message
  // overlay, and restarts the game (via game.init()) when ESC is pressed.
  gameOver(message) {
    this.gameOverMessage = message
    this.state = STATES.GAME_OVER
  }

  restart() {
    this.gameOverMessage = ''
    this.accumulator = 0
    this.game.init()
    this.state = STATES.PLAYING
  }

  handleStateInput() {
    const pauseKeyIsDown = Keyboard.isDown(PAUSE_KEY)
    if (pauseKeyIsDown && !this.pauseKeyWasDown) {
      if (this.state === STATES.PLAYING) {
        this.state = STATES.PAUSED
      } else if (this.state === STATES.PAUSED) {
        this.state = STATES.PLAYING
      }
    }
    this.pauseKeyWasDown = pauseKeyIsDown

    if (this.state === STATES.GAME_OVER && Keyboard.isDown(RESTART_KEY)) {
      this.restart()
    }
  }

  drawOverlay(title, subtitle) {
    const ctx = this.context
    ctx.save()
    ctx.fillStyle = OVERLAY_BACKGROUND_COLOR
    ctx.fillRect(0, 0, this.width, this.height)
    ctx.fillStyle = OVERLAY_TEXT_COLOR
    ctx.textAlign = 'center'
    ctx.font = '48px monospace'
    ctx.fillText(title, this.width / 2, this.height / 2 - 16)
    ctx.font = '20px monospace'
    ctx.fillText(subtitle, this.width / 2, this.height / 2 + 32)
    ctx.restore()
  }
}
