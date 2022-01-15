import GameMachine from '../../../common/GameMachine.js'
import PongGame from './PongGame.js'

const cfg = {
  width: 1000,
  height: 800,
  fps: 60
}

window.game = new PongGame(1000, 800)
const gameMachine = new GameMachine(game, cfg, '.gameStage')
window.game.init()
gameMachine.start()
