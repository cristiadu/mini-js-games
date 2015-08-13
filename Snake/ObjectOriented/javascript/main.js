(function () {
    window.game = new SnakeGame(800,800);
    var cfg = {
        width: 800,
        height: 800,
        fps: 20
    },
    gameMachine = new GameMachine( game, cfg, '.gameStage' );

    game.init();
    gameMachine.start();

   
})();