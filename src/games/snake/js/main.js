import GameMachine from '../../../common/GameMachine.js'
import SnakeGame from './SnakeGame.js'

const cfg = {
  width: 796,
  height: 796,
  fps: 25,
}

window.game = new SnakeGame(cfg.width, cfg.height)
window.gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
window.gameMachine.start()
