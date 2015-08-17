function Ball(){
	
	this.radius = BALL_RADIUS;
	this.X = 0;
	this.Y = 0;
	this.vX = 0;
	this.vY = 3;
}


Ball.prototype.update = function () {
	
	this.X += this.vX;
	this.Y += this.vY;

	this.checkCollisionWithVerticalWall();
};

Ball.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#fff';
  	ctx.beginPath();
  	ctx.arc(this.X,this.Y,this.radius,0,2*Math.PI);
  	ctx.fill();
};


Ball.prototype.checkCollisionWithHorizontalWall = function (collide) {

	// If didnt collide with block or paddle
	if(!collide)
	{
		if(this.Y - this.radius <= 0)
			this.vY = -this.vY;
		else if(this.Y + this.radius >= game.height)
		{
			this.init();
			game.lives--;
		}
	}

};

Ball.prototype.checkCollisionWithVerticalWall = function () {

	// Means changing direction
	if(((this.X - this.radius) <= 0) || ((this.X + this.radius) >= game.width))
		this.vX = -this.vX;
	
};

Ball.prototype.changeDirection = function (bounceAngle) {

	// It hit a paddle, so increase speed.
	if(this.vX < 0)
	{
		this.vY = -(this.vY + (-1.00)*Math.abs(Math.cos(bounceAngle)));
		this.vX = (this.vX + (1.00)*(-Math.sin(bounceAngle)));
	}
	else
	{
		this.vX = (this.vX + (1.00)*(-Math.sin(bounceAngle)));
		this.vY = -(this.vY + (1.00)*Math.abs(Math.cos(bounceAngle)));
	}

	
	console.log("I changed! vx "+this.vX+" vy "+this.vY+" bounceAngle= "+bounceAngle);
};

Ball.prototype.init = function () {
	
	this.X = game.width/2;
	this.Y = game.height/2;
	this.vX = 0;
	this.vY = 3;
};



