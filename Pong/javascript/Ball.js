function Ball(){
	
	this.radius = BALL_RADIUS;
	this.X = 0;
	this.Y = 0;
	this.vX = 3;
	this.vY = 0;
}


Ball.prototype.update = function () {
	
	this.X += this.vX;
	this.Y += this.vY;

	this.checkCollisionWithHorizontalWall();
};

Ball.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#fff';
  	ctx.beginPath();
  	ctx.arc(this.X,this.Y,this.radius,0,2*Math.PI);
  	ctx.fill();
};


Ball.prototype.checkCollisionWithVerticalWall = function (collidePaddle) {

	// Means scoring a point
	if(!collidePaddle)
	{
		if(this.X - this.radius <= 0)
			game.scorePoint(POSITION.LEFT);
		else if(this.X + this.radius >= game.width)
			game.scorePoint(POSITION.RIGHT);
	}

};

Ball.prototype.checkCollisionWithHorizontalWall = function () {

	// Means changing direction
	if(((this.Y - this.radius) <= 0) || ((this.Y + this.radius) >= game.height))
		this.vY = -this.vY;
	
};

Ball.prototype.changeDirection = function (bounceAngle) {

	// It hit a paddle, so increase speed.
	if(this.vX < 0)
	{
		this.vX = -(this.vX + (-1.00)*Math.abs(Math.cos(bounceAngle)));
		this.vY = (this.vY + (1.00)*(-Math.sin(bounceAngle)));
	}
	else
	{
		this.vY = (this.vY + (1.00)*(-Math.sin(bounceAngle)));
		this.vX = -(this.vX + (1.00)*Math.abs(Math.cos(bounceAngle)));
	}

	
	console.log("I changed! vx "+this.vX+" vy "+this.vY+" bounceAngle= "+bounceAngle);
};

Ball.prototype.init = function () {
	
	this.X = game.width/2;
	this.Y = game.height/2;
	this.vX = 3;
	this.vY = 0;
};



