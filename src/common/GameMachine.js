const STATES = {
  PLAYING: 0,
  STOPPED: 1,
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

    this.width = cfg.width
    this.height = cfg.height

    this.gameCanvas.width = cfg.width
    this.gameCanvas.height = cfg.height

    this.step = () => {
      this.now = performance.now()
      this.elapsed = this.now - this.last
      this.last = this.now
      this.accumulator += Math.min(1000, this.elapsed)

      while (this.accumulator >= this.dStep) {
        this.game.update()
        this.accumulator -= this.dStep
      }
      this.game.draw(this.context, this.accumulator)

      if (this.state === STATES.PLAYING) {
        requestAnimationFrame(this.step)
      }
    }
  }

  start = () => {
    this.state = STATES.PLAYING
    this.last = performance.now()
    this.step()
  }
}
