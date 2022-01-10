const cfg = {
  width: 1000,
  height: 800,
  fps: 60
}

const gameMachine = new GameMachine(game, cfg, '.gameStage')
window.game = new PongGame(1000, 800)
window.game.init()
gameMachine.start()
