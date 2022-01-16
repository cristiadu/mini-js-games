import GameMachine from '../../../common/GameMachine.js'
import SnakeGame from './SnakeGame.js'

const cfg = {
  width: 800,
  height: 800,
  fps: 30,
}

window.game = new SnakeGame(cfg.width, cfg.height)
const gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
gameMachine.start()
