import GameMachine from '../../../common/GameMachine.js'
import PongGame from './PongGame.js'

const cfg = {
  width: 1000,
  height: 800,
  fps: 120,
}

window.game = new PongGame(cfg.width, cfg.height)
window.gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
window.gameMachine.start()
