import Keyboard, { Keys } from './Keyboard.js'

/** Key that toggles pause in every game. */
const PAUSE_KEY = Keys.P

/** Key that restarts a finished game. */
const RESTART_KEY = Keys.ESCAPE

/** Semi-transparent dim drawn over the frozen frame while paused or game over. */
const OVERLAY_BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.6)'

/** Color of the overlay title and subtitle text. */
const OVERLAY_TEXT_COLOR = '#FFF'

/**
 * Lifecycle states of the machine. Updates only run while PLAYING;
 * PAUSED and GAME_OVER keep drawing the frozen frame under an overlay.
 * @enum {number}
 */
const STATES = {
  PLAYING: 0,
  STOPPED: 1,
  PAUSED: 2,
  GAME_OVER: 3,
}

/**
 * A game the machine can run. Any class with this shape works.
 *
 * @typedef {Object} Game
 * @property {function(): void} update Advances game logic by one fixed step (input, movement, collisions).
 * @property {function(CanvasRenderingContext2D, number): void} draw Renders the current state; receives the 2D context
 *   and the accumulator remainder (ms not yet consumed by fixed steps).
 * @property {function(): void} init Positions/resets all entities; called before the loop starts and on every restart.
 * @property {GameMachine} [machine] Back-reference set by the machine on construction.
 */

/**
 * Fixed-timestep game loop on top of requestAnimationFrame.
 *
 * Each frame it accumulates elapsed wall-clock time and calls game.update()
 * once per fixed step (1000 / fps ms) until the accumulator drains, so game
 * logic advances at a constant rate regardless of frame rate. It also owns the
 * cross-game state flow: pause toggling, the game-over screen, and ESC restart.
 */
export default class GameMachine {
  /**
   * Wires the machine to a game and a canvas and prepares (but does not start) the loop.
   *
   * @param {Game} game The game instance to drive; receives a `machine` back-reference.
   * @param {{width: number, height: number, fps?: number}} cfg Canvas size and optional fixed update rate (default 60).
   * @param {string} selector CSS selector for the target <canvas> element.
   */
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

    /**
     * Runs one frame: handles pause/restart input, drains the accumulator
     * through game.update() while PLAYING, draws the game and any overlay,
     * and schedules the next frame.
     */
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

  /** Enters the PLAYING state and kicks off the frame loop. */
  start = () => {
    this.state = STATES.PLAYING
    this.last = performance.now()
    this.step()
  }

  /**
   * Ends the current round; the machine freezes updates, shows the message
   * overlay, and restarts the game (via game.init()) when ESC is pressed.
   *
   * @param {string} message Overlay title, e.g. 'Game Over' or 'You won!'.
   */
  gameOver(message) {
    this.gameOverMessage = message
    this.state = STATES.GAME_OVER
  }

  /** Resets the game through game.init() and resumes playing. */
  restart() {
    this.gameOverMessage = ''
    this.accumulator = 0
    this.game.init()
    this.state = STATES.PLAYING
  }

  /**
   * Polls the pause and restart keys once per frame. The pause key is
   * edge-detected so holding it down toggles only once.
   */
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

  /**
   * Dims the whole canvas and centers a title with a smaller subtitle under it.
   *
   * @param {string} title Large overlay headline.
   * @param {string} subtitle Hint line rendered below the title.
   */
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
