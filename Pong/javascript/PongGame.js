function PongGame (w,h) {
    this.width = w;
    this.height = h;
    this.player1Paddle = new Paddle("left","human");
    this.player2Paddle = new Paddle("right","human2");
    this.ball = new Ball();
}

	
PongGame.prototype.update = function () {

	this.player1Paddle.update();
	this.player2Paddle.update();
	this.ball.update();
};

PongGame.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#000';
    ctx.fillRect( 0, 0, this.width, this.height);

	this.player1Paddle.draw(ctx,dt);
	this.player2Paddle.draw(ctx,dt);
	this.ball.draw();
};

PongGame.prototype.init = function () {

	this.player1Paddle.init();
	this.player2Paddle.init();
	this.ball.init();
};



