import GameMachine from '../../../common/GameMachine.js'
import BreakoutGame from './BreakoutGame.js'

const cfg = {
  width: 1000,
  height: 800,
  fps: 120,
}

window.game = new BreakoutGame(cfg.width, cfg.height)
const gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
gameMachine.start()
