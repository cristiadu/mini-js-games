// constants that define a size for the canvas
var CANVAS_WIDTH = 300
var CANVAS_HEIGHT = 150

// Constant that kind of definine amount of frames per second. 
//It actually interfere in how much time it will wait until update and draw methods are executed again. 
var FRAMES_PER_SECOND = 30;

// Define the interval for food exibiting
var FOOD_INTERVAL = 0.3;

// Creating canvas with width and height defined, and appending it inside the body tag
var $canvas = $("<canvas id='snakeCanvas' width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
$canvas.appendTo('body');

// Getting 2d context from canvas
var $ctx = $canvas.get(0).getContext("2d");

// Position of the Snake's head
var posX,posY;

/* update method: Change direction of Snake, define if user won or lost the game, check boundaries, see if player ate a food, increase snake's size. */
function update()
{
	posX++;
}

/* draw method: Draw Snake according with changes made from update method, Draw food if needed */
function draw()
{
	$ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	$ctx.fillStyle = "black";
	$ctx.fillRect(posX,posY);
}

/* spawnFood method: Include a food spawning in some random spot inside Canvas (verifying if it is not the same spot the Snake is located) */
function spawnFood()
{

}

function init()
{
	posX = 2;
	posY = 2;
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
/* checkInput method: verify the input from player, changing direction's variables from Snake in order to update it inside proper method */
function checkInput(input)
{

}

$(document).ready(function(){
	init();


});




