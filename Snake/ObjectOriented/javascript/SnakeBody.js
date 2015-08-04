function SnakeBody (initialX,initialY,previous) {
    this.next = null;
    this.prev = previous;
    this.direction = previous.direction;
    this.lastDirection = previous.direction;
    this.X = initialX;
    this.Y = initialY;
    
}

SnakeBody.prototype.update = function()
{
    // Next element will get direction from before the update
    this.lastDirection = this.direction;
    this.direction = this.prev.lastDirection;

    switch(this.direction)
    {
        case DIRECTION.RIGHT:
            this.X = this.X + SIZE_SNAKE;
        break;
        case DIRECTION.LEFT:
            this.X = this.X - SIZE_SNAKE;
        break;
        case DIRECTION.UP:
            this.Y = this.Y - SIZE_SNAKE;
        break;
        case DIRECTION.DOWN:
            this.Y = this.Y + SIZE_SNAKE;
        break;
        default:
            this.X = this.X + SIZE_SNAKE;
        break;
    }

    if(this.next != null)
        this.next.update();
};

SnakeBody.prototype.draw = function(ctx,dt)
{
    ctx.fillStyle = '#00FF00';
    ctx.fillRect( this.X, this.Y, SIZE_SNAKE, SIZE_SNAKE);
    if(this.next != null)
        this.next.draw(ctx,dt);
};

SnakeBody.prototype.increase = function()
{
    if(this.next != null)
        this.next.increase();
    else
    {
        switch(this.direction)
        {
            case DIRECTION.RIGHT:
                this.next = new SnakeBody(this.X - SIZE_SNAKE,this.Y,this);
            break;
            case DIRECTION.LEFT:
                this.next = new SnakeBody(this.X + SIZE_SNAKE,this.Y,this);
            break;
            case DIRECTION.UP:
                this.next = new SnakeBody(this.X,this.Y - SIZE_SNAKE,this);
            break;
            case DIRECTION.DOWN:
                this.next = new SnakeBody(this.X,this.Y + SIZE_SNAKE,this);
            break;
            default:
                this.next = new SnakeBody(this.X - SIZE_SNAKE,this.Y,this);
            break;
        }
    }
        

};

