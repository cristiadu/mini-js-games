function PongGame (w,h) {
    this.width = w;
    this.height = h;
    this.player1Paddle = new Paddle(POSITION.LEFT,PLAYER_TYPE.HUMAN);
    this.player2Paddle = new Paddle(POSITION.RIGHT,PLAYER_TYPE.HUMAN2);
    this.ball = new Ball();
}

	
PongGame.prototype.update = function () {

	this.ball.update();
	
	

	this.player1Paddle.update();
	this.player2Paddle.update();

	this.checkCollisionBallwithPaddle();
};

PongGame.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#000';
    ctx.fillRect( 0, 0, this.width, this.height);

	this.ball.draw(ctx,dt);
	this.player1Paddle.draw(ctx,dt);
	this.player2Paddle.draw(ctx,dt);
	

	ctx.fillStyle = '#fff';
	ctx.font = "48px Monospace";
  	ctx.fillText(this.player1Paddle.points+" X "+this.player2Paddle.points, (game.width-100)/2, 50);
};

PongGame.prototype.checkCollisionBallwithPaddle = function () 
{
	var angle = 0;
	

	if(this.ball.X > this.player1Paddle.X && this.ball.X < this.player1Paddle.X+THICKNESS_PADDLE && this.ball.Y > this.player1Paddle.Y && this.ball.Y < this.player1Paddle.Y+SIZE_PADDLE) 
	{
		var bounceAngle = this.player1Paddle.getBounceAngle(this.ball.Y);
		this.ball.changeDirection(bounceAngle);
				
	}
	else if(this.ball.X > this.player2Paddle.X && this.ball.X < this.player2Paddle.X+THICKNESS_PADDLE && this.ball.Y > this.player2Paddle.Y && this.ball.Y < this.player2Paddle.Y+SIZE_PADDLE) 
	{
		var bounceAngle = this.player2Paddle.getBounceAngle(this.ball.Y);
		this.ball.changeDirection(bounceAngle);
	}


	
};

PongGame.prototype.scorePoint = function (pos) 
{
	if(pos == POSITION.LEFT)
		this.player2Paddle.points++;
	else if(pos == POSITION.RIGHT)
		this.player1Paddle.points++;

	this.ball.init();
};

PongGame.prototype.init = function () {

	this.player1Paddle.init();
	this.player2Paddle.init();
	this.ball.init();
};



