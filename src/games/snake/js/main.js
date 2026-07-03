/**
 * Snake entry point: builds the game and its GameMachine, exposes both as
 * globals (entities reach the game via window.game), and starts the loop.
 */
import GameMachine from '../../../common/GameMachine.js'
import SnakeGame from './SnakeGame.js'

/** Canvas size and fixed update rate for this game. */
const cfg = {
  width: 796,
  height: 796,
  fps: 25,
}

window.game = new SnakeGame(cfg.width, cfg.height)
window.gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
window.gameMachine.start()
