(function () {
    window.game = new PongGame(1000,800);
    var cfg = {
        width: 1000,
        height: 800,
        fps: 60
    },
    gameMachine = new GameMachine( game, cfg, '.gameStage' );

    game.init();
    gameMachine.start();

   
})();