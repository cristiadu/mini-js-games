const cfg = {
  width: 1000,
  height: 800,
  fps: 60
}

gameMachine = new GameMachine(game, cfg, '.gameStage');
window.game = new BreakoutGame(1000, 800);
game.init();
gameMachine.start();
