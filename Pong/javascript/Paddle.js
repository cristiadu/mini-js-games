function Paddle(pos, pType){
	
	this.playerType = pType;
	this.position = pos;
	this.X = 0;
	this.Y = 0;
}


Paddle.prototype.update = function () {
	this.checkInput();
	this.checkCollisionWithWall();
};

Paddle.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#fff';
    ctx.fillRect(this.X, this.Y, THICKNESS_PADDLE, SIZE_PADDLE);
};


Paddle.prototype.checkInput = function () {

	if(this.position == PLAYERS.HUMAN)
	{

	}
	else if(this.position == PLAYERS.HUMAN2)
	{

	}

};

Paddle.prototype.checkCollisionWithWall = function () {

	// Collision with the wall
};

Paddle.prototype.init = function () {
	if(this.position == POSITION.RIGHT)
	{
		this.X = game.width - THICKNESS_PADDLE;
		this.Y = game.height/2;
	}
	else if(this.position == POSITION.LEFT)
	{
		this.X = 0;
		this.Y = game.height/2;
	}
	else
	{
		this.X = 0;
		this.Y = game.height/2;
	}

};



