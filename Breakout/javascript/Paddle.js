function Paddle(){
	
	this.X = 0;
	this.Y = 0;
}


Paddle.prototype.update = function () {
	
	this.checkInput();

	this.checkCollisionWithWall();
};

Paddle.prototype.draw = function (ctx,dt) 
{
  	ctx.fillStyle = '#fff';
    ctx.fillRect(this.X, this.Y,SIZE_PADDLE , THICKNESS_PADDLE);
};


Paddle.prototype.checkInput = function () 
{

	if(Keyboard.isDown(KEYCODES.left))
		this.X -= SPEED_PADDLE;
	else if(Keyboard.isDown(KEYCODES.right))
		this.X += SPEED_PADDLE;
	

};

// Used to calculate the angles
Paddle.prototype.getBounceAngle = function (intersectX) 
{
	// Y position relative to paddle height.
	var relativeIntersection = this.X + (SIZE_PADDLE/2) - intersectX;

	return (relativeIntersection/(SIZE_PADDLE/2))*MAX_BOUNCE_ANGLE;
};

Paddle.prototype.checkCollisionWithWall = function () {

	// Collision with wall
	if(this.X <= 0)
		this.X = 0;
	else if(this.X + SIZE_PADDLE >= game.width)
		this.X = game.width - SIZE_PADDLE;
};

Paddle.prototype.init = function () {
	this.X = game.width/2;
	this.Y = game.height - THICKNESS_PADDLE - 10;

};



