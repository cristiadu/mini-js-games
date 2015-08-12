function Ball(){
	
	this.radius = BALL_RADIUS;
	this.X = 0;
	this.Y = 0;
	this.vX = 1.5;
	this.vY = 0;
}


Ball.prototype.update = function () {
	
	this.X += this.vX;
	this.Y += this.vY;

	this.checkCollisionWithVerticalWall();
	this.checkCollisionWithHorizontalWall();
};

Ball.prototype.draw = function (ctx,dt) {
  	ctx.fillStyle = '#fff';
  	ctx.beginPath();
  	ctx.arc(this.X,this.Y,this.radius,0,2*Math.PI);
  	ctx.fill();
};


Ball.prototype.checkCollisionWithVerticalWall = function () {

	// Means scoring a point
	game.scorePoint(POSITION.LEFT);
};

Ball.prototype.checkCollisionWithHorizontalWall = function () {

	// Means changing direction
};

Ball.prototype.changeDirection = function (bounceAngle) {

	// It hit a paddle, so increase speed.
	if(this.vX < 0)
	{
		this.vX = -(this.vX + (-1.00)*Math.cos(bounceAngle));
		this.vY = (this.vY + (-1.00)*(-Math.sin(bounceAngle)));
	}
	else
	{
		this.vY = (this.vY + (1.00)*(-Math.sin(bounceAngle)));
		this.vX = -(this.vX + (1.00)*Math.cos(bounceAngle));
	}

	
	console.log("I changed! vx "+this.vX+" vy "+this.vY);
};

Ball.prototype.init = function () {
	
	this.X = game.width/2;
	this.Y = game.height/2;
	this.vX = 1.5;
	this.vY = 0;
};



