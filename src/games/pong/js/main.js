/**
 * Pong entry point: builds the game and its GameMachine, exposes both as
 * globals (entities reach the game via window.game), and starts the loop.
 */
import GameMachine from '../../../common/GameMachine.js'
import PongGame from './PongGame.js'

/** Canvas size and fixed update rate for this game. */
const cfg = {
  width: 1000,
  height: 800,
  fps: 120,
}

window.game = new PongGame(cfg.width, cfg.height)
window.gameMachine = new GameMachine(window.game, cfg, '.gameStage')
window.game.init()
window.gameMachine.start()
