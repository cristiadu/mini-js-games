class Block {
  constructor() {
    this.X = 0
    this.Y = 0
    this.color = getRndColor()
    this.show = true
  }

  draw(ctx, dt) {
    if (this.show == true) {
      ctx.fillStyle = (this.color) ? this.color : "green"
      ctx.fillRect(this.X, this.Y, SIZE_BLOCK, THICKNESS_BLOCK)
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.strokeRect(this.X, this.Y, SIZE_BLOCK, THICKNESS_BLOCK)
    }
  }

  // Used to calculate the angles
  getBounceAngle(intersectX) {
    // Y position relative to paddle height.
    var relativeIntersection = this.X + (SIZE_PADDLE / 2) - intersectX
    return (relativeIntersection / (SIZE_PADDLE / 2)) * MAX_BOUNCE_ANGLE
  }

  init(line, collumn) {
    this.Y = line * THICKNESS_BLOCK
    this.X = collumn * SIZE_BLOCK
  }
}
