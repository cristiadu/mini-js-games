const STATES = {
  PLAYING: 0,
  STOPPED: 1,
  PAUSED: 2
}

class GameMachine {
  constructor(game, cfg, selector) {
    this.game = game
    this.game.machine = this
    this.gameCanvas = document.querySelector(selector)
    this.context = this.gameCanvas.getContext('2d')
    this.now
    this.ellapsed
    this.last
    this.fps = cfg.fps || 60
    this.dStep = 1000 / this.fps
    this.accumulator
    this.state = STATES.STOPPED

    this.width = cfg.width
    this.height = cfg.height

    this.gameCanvas.width = cfg.width
    this.gameCanvas.height = cfg.height

    this.last = new Date().getTime()
    this.accumulator = 0
    this.state = STATES.PLAYING
    this.step = () => {
      this.now = new Date().getTime()
      this.ellapsed = this.now - this.last
      this.last = this.now
      this.accumulator += Math.min(1000, this.ellapsed)

      while (this.accumulator >= this.dStep) {
        this.game.update()
        this.accumulator -= this.dStep
      }
      this.game.draw(this.context, this.accumulator)

      if (this.state === STATES.PLAYING) {
        requestAnimationFrame(this.step, this.gameCanvas)
      }
    };
  }

  start = () => {
    this.step()
  }
}

window.GameMachine = GameMachine
