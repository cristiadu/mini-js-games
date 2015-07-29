// constants that define a size for the canvas
var CANVAS_WIDTH = 800
var CANVAS_HEIGHT = 400

// Constant that kind of definine amount of frames per second. 
//It actually interfere in how much time it will wait until update and draw methods are executed again. 
var FRAMES_PER_SECOND = 30;

// Define the interval for food exibiting
var FOOD_INTERVAL = 0.1;

var ENUM_DIRECTION = {
	UP: 'Up',
	DOWN: 'Down',
	LEFT: 'Left',
	RIGHT: 'Right'
}

// Creating canvas with width and height defined, and appending it inside the body tag
var $canvas = $("<canvas id='snakeCanvas' width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "' style='border:1px solid #000000;'></canvas>");
$canvas.appendTo('body');

// Getting 2d context from canvas
var $ctx = $canvas.get(0).getContext("2d");

// Variables from the game
var direction,gameOver;
var foodJson;
var snakeBlocks;
/* update method: Change direction of Snake, define if user won or lost the game, check boundaries, see if player ate a food, increase snake's size. */
function update()
{
	checkInput();

	if(!gameOver)
	{
		// I need to find a better solution here than this one, but for now, I think it works.
		var oldBlocks = JSON.parse(JSON.stringify(snakeBlocks));

		verifyFoodEaten();
		checkCollision();

		for(i in snakeBlocks)
		{
			
	

			if (snakeBlocks[i].direction == ENUM_DIRECTION.LEFT) 
			{
				snakeBlocks[i].posX-=4;
			}
			else if (snakeBlocks[i].direction == ENUM_DIRECTION.RIGHT) 
			{
				snakeBlocks[i].posX+=4;
			}
			else if (snakeBlocks[i].direction == ENUM_DIRECTION.UP) 
			{
				snakeBlocks[i].posY-=4;
			}
			else if (snakeBlocks[i].direction == ENUM_DIRECTION.DOWN) 
			{
				snakeBlocks[i].posY+=4;
			}

			if(i != 0)
				snakeBlocks[i].direction = oldBlocks[i-1].direction;
			else
				snakeBlocks[i].direction = direction;

		}


	}
}



/* draw method: Draw Snake according with changes made from update method, Draw food if needed */
function draw()
{
	$ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	$ctx.fillStyle = "black";

	for(i in snakeBlocks)
	{
		$ctx.fillRect(snakeBlocks[i].posX,snakeBlocks[i].posY,8,8);
		
	}

	if(gameOver)
	{
		$ctx.fillText("Game Over, press ESC if you want to restart.",25,25);
	}

	$ctx.fillStyle = "green";

	for(i in foodJson)
	{
		$ctx.fillRect(foodJson[i].posX,foodJson[i].posY,4,4);
		
	}
}

/* spawnFood method: Include a food spawning in some random spot inside Canvas (verifying if it is not the same spot the Snake is located) */
function spawnFood()
{
	var foodX = getRandomInt(0,CANVAS_WIDTH);
	var foodY = getRandomInt(0,CANVAS_HEIGHT);

	while((foodX == snakeBlocks[0].posX) && (foodY == snakeBlocks[0].posY))
	{
		foodX = getRandomInt(0,CANVAS_WIDTH);
		foodY = getRandomInt(0,CANVAS_HEIGHT);
	}

	foodJson.push({
		'posX': foodX,
		'posY': foodY
	});
}

function between(x, min, max) {
  return x >= min && x <= max;
}

function verifyFoodEaten()
{

	for(i in foodJson)
	{
		if((between(foodJson[i].posX,snakeBlocks[0].posX-4,snakeBlocks[0].posX+4))&&(between(foodJson[i].posY,snakeBlocks[0].posY-4,snakeBlocks[0].posY+4)))
		{
			console.log("Yeah, I ate!");
			delete foodJson[i];
			increaseSizeSnake();
			break;
		}
	}

}

function increaseSizeSnake()
{
	if (snakeBlocks[snakeBlocks.length -1].direction == ENUM_DIRECTION.LEFT) 
	{
		snakeBlocks.push({
		'posX': snakeBlocks[snakeBlocks.length -1].posX-4,
		'posY': snakeBlocks[snakeBlocks.length -1].posY,
		'direction': snakeBlocks[snakeBlocks.length -1].direction
		});

		
	}
	else if (snakeBlocks[snakeBlocks.length -1].direction == ENUM_DIRECTION.RIGHT) 
	{
		snakeBlocks.push({
		'posX': snakeBlocks[snakeBlocks.length -1].posX+4,
		'posY': snakeBlocks[snakeBlocks.length -1].posY,
		'direction': snakeBlocks[snakeBlocks.length -1].direction
		});

	}
	else if (snakeBlocks[snakeBlocks.length -1].direction == ENUM_DIRECTION.UP) 
	{
		snakeBlocks.push({
		'posX': snakeBlocks[snakeBlocks.length -1].posY-4,
		'posY': snakeBlocks[snakeBlocks.length -1].posY,
		'direction': snakeBlocks[snakeBlocks.length -1].direction
		});

	}
	else if (snakeBlocks[snakeBlocks.length -1].direction == ENUM_DIRECTION.DOWN) 
	{
		snakeBlocks.push({
		'posX': snakeBlocks[snakeBlocks.length -1].posY+4,
		'posY': snakeBlocks[snakeBlocks.length -1].posY,
		'direction': snakeBlocks[snakeBlocks.length -1].direction
		});
	}


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
	direction = ENUM_DIRECTION.RIGHT;
	gameOver = false;
	foodJson = [];
	snakeBlocks = [{
		'posX': 2,
		'posY': 2,
		'direction': ENUM_DIRECTION.RIGHT
	}];
	
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
	if((snakeBlocks[0].posX >= CANVAS_WIDTH) || (snakeBlocks[0].posX <= 0) || (snakeBlocks[0].posY >= CANVAS_HEIGHT) || (snakeBlocks[0].posY <= 0))
		gameOver = true;
}

$(document).ready(function(){
	init();
});




