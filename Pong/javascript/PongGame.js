function PongGame (w,h) {
    this.width = w;
    this.height = h;
    this.playerPaddle = new Paddle("left","player");
    this.player2Paddle = new Paddle("right","player");
    this.ball = new Ball();
}

	
PongGame.prototype.update = function () {
	this.checkInput();


};

PongGame.prototype.draw = function (ctx,dt) {

};

PongGame.prototype.checkInput = function () {


};

PongGame.prototype.init = function () {

};



