import GameMachine from "../../../common/GameMachine.js"
import SnakeGame from './SnakeGame.js'

const cfg = {
  width: 800,
  height: 800,
  fps: 20
}

window.game = new SnakeGame(800, 800)
const gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
gameMachine.start()
