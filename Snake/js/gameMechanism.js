// constants that define a size for the canvas
var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 400

// Constant that kind of definine amount of frames per second. 
//It actually interfere in how much time it will wait until update and draw methods are executed again. 
var FRAMES_PER_SECOND = 30;

// Define the interval for food exibiting
var FOOD_INTERVAL = 0.3;

var ENUM_DIRECTION = {
	UP: 'Up',
	DOWN: 'Down',
	LEFT: 'Left',
	RIGHT: 'Right'
}

// Creating canvas with width and height defined, and appending it inside the body tag
var $canvas = $("<canvas id='snakeCanvas' width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
$canvas.appendTo('body');

// Getting 2d context from canvas
var $ctx = $canvas.get(0).getContext("2d");

// Variables from the game
var posX,posY, direction,gameOver,posFoodX,posFoodY,showFood;

/* update method: Change direction of Snake, define if user won or lost the game, check boundaries, see if player ate a food, increase snake's size. */
function update()
{
	checkInput();

	if(!gameOver)
	{
		if (direction == ENUM_DIRECTION.LEFT) 
		{
			posX-=2;
		}
		else if (direction == ENUM_DIRECTION.RIGHT) 
		{
			posX+=2;
		}
		else if (direction == ENUM_DIRECTION.UP) 
		{
			posY-=2;
		}
		else if (direction == ENUM_DIRECTION.DOWN) 
		{
			posY+=2;
		}

		verifyFoodEaten();
		checkCollision();
	}
}

/* draw method: Draw Snake according with changes made from update method, Draw food if needed */
function draw()
{
	$ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	$ctx.fillStyle = "black";
	$ctx.fillRect(posX,posY,8,8);

	if(gameOver)
	{
		$ctx.fillText("Game Over, press ESC if you want to restart.",25,25);
	}

	if(showFood)
	{
		$ctx.fillStyle = "green";
		$ctx.fillRect(posFoodX,posFoodY,6,6);
	}
}

/* spawnFood method: Include a food spawning in some random spot inside Canvas (verifying if it is not the same spot the Snake is located) */
function spawnFood()
{
	var foodX = getRandomInt(0,CANVAS_WIDTH);
	var foodY = getRandomInt(0,CANVAS_HEIGHT);

	while((foodX == posX) || (foodY == posX) || (foodY == posX) || (foodY == posY))
	{
		foodX = getRandomInt(0,CANVAS_WIDTH);
		foodY = getRandomInt(0,CANVAS_HEIGHT);
	}

	posFoodY = foodY;
	posFoodX = foodX;
	showFood = true;
}

function verifyFoodEaten()
{
	
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init()
{
	initializeGlobalVariables();

	setInterval(function()
	{
		update();
		draw();
	}
	,1000/FRAMES_PER_SECOND);

	setInterval(function(){
		spawnFood();
	},1000/FOOD_INTERVAL);
}

function initializeGlobalVariables()
{
	posX = 2;
	posY = 2;
	direction = ENUM_DIRECTION.RIGHT;
	gameOver = false;
	showFood = false;
}

/* checkInput method: verify the input from player, changing direction's variables from Snake in order to update it inside proper method */
function checkInput(input)
{
	if (keydown.left) 
	{
		direction = ENUM_DIRECTION.LEFT;
	}
	else if (keydown.right) 
	{
		direction = ENUM_DIRECTION.RIGHT;
	}
	else if(keydown.up)
	{
		direction = ENUM_DIRECTION.UP;
	}
	else if(keydown.down)
	{
		direction = ENUM_DIRECTION.DOWN;
	}
	else if(keydown.esc)
	{
		initializeGlobalVariables();
	}
}

function checkCollision()
{
	if((posX >= CANVAS_WIDTH) || (posX <= 0) || (posY >= CANVAS_HEIGHT) || (posY <= 0))
		gameOver = true;
}

$(document).ready(function(){
	init();
});




