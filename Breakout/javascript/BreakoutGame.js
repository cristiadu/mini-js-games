function BreakoutGame (w,h) {
    this.width = w;
    this.height = h;
    this.playerPaddle = new Paddle();
    this.ball = new Ball();
    this.blocks = [];
    this.lives = 3;
    this.activeBlocks;
}

	
BreakoutGame.prototype.update = function () {

	if((this.activeBlocks > 0) && (this.lives > 0))
	{
		this.ball.update();
		this.playerPaddle.update();
		
		var collides = this.checkCollisionBallwithPaddle();

		var collides2 = this.checkCollisionBallwithBlock();

		this.ball.checkCollisionWithHorizontalWall(collides && collides2);
	}

};

BreakoutGame.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#000';
    ctx.fillRect( 0, 0, this.width, this.height);


	this.ball.draw(ctx,dt);
	this.playerPaddle.draw(ctx,dt);
	
	for(i in this.blocks)
		this.blocks[i].draw(ctx,dt);

	if(this.activeBlocks <= 0)
		ctx.fillText("You won!",25,25);
	else if(this.lives <= 0)
		ctx.fillText("You lost!",25,25);
	
};

BreakoutGame.prototype.checkCollisionBallwithPaddle = function () 
{
	var angle = 0;
	var collides = false;

	if(((this.ball.Y + this.ball.radius) >= this.playerPaddle.Y) && (this.playerPaddle.X <= this.ball.X) && ((this.playerPaddle.X + SIZE_PADDLE) >= this.ball.X))
	{
		var bounceAngle = this.playerPaddle.getBounceAngle(this.ball.X);
		this.ball.changeDirection(bounceAngle);
		collides = true;
	}


	return collides;
};

BreakoutGame.prototype.checkCollisionBallwithBlock = function () 
{
	var angle = 0;
	var collides = false;
	for(i in this.blocks)
	{
		if((this.blocks[i].show)&&(((this.ball.Y - this.ball.radius) <= this.blocks[i].Y + THICKNESS_BLOCK)&&((this.ball.Y - this.ball.radius) >= (this.blocks[i].Y)))
			&& ((((this.ball.X - this.ball.radius) <= (this.blocks[i].X+SIZE_BLOCK))&&((this.ball.X - this.ball.radius) >= this.blocks[i].X))
			|| (((this.ball.X + this.ball.radius) >= (this.blocks[i].X))&&((this.ball.X + this.ball.radius) <= (this.blocks[i].X + SIZE_BLOCK)))))
		{
			var bounceAngle = this.blocks[i].getBounceAngle(this.ball.X);
			this.ball.changeDirection(bounceAngle);
			collides = true;
			this.blocks[i].show = false;
			game.activeBlocks--;
		}
	}

	return collides;
};

BreakoutGame.prototype.init = function () {

	this.playerPaddle.init();
	this.ball.init();

	// Creating blocks
	var j = 0;
	for(var i = 0;i<NUM_LINES_BLOCKS;i++)
	{
		for(j =0;j<game.width/SIZE_BLOCK;j++)
		{
			this.blocks.push(new Block());
			this.blocks[i*(game.width/SIZE_BLOCK) + j].init(i,j);
			
		}
	}

	this.activeBlocks = NUM_LINES_BLOCKS * (game.width/SIZE_BLOCK);

};



