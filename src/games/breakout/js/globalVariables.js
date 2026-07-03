/** KeyboardEvent.code values for the paddle movement keys. */
export const KEYS = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
}

/** Ball radius in pixels. */
export const BALL_RADIUS = 5

/** Ball speed in pixels per update at the start of a round. */
export const BALL_INITIAL_SPEED = 2

/** Paddle width in pixels. */
export const SIZE_PADDLE = 120

/** Paddle height in pixels. */
export const THICKNESS_PADDLE = 20

/** Paddle speed in pixels per update while a movement key is held. */
export const SPEED_PADDLE = 4

/** Block height in pixels. */
export const THICKNESS_BLOCK = 30

/** Block width in pixels. */
export const SIZE_BLOCK = 100

/** Number of block rows in the grid. */
export const NUM_LINES_BLOCKS = 5

/** Lives the player starts a round with. */
export const GAME_LIVES = 3

/** Ball fill color. */
export const BALL_COLOR = '#E7F9A9'

/** Paddle fill color. */
export const PADDLE_COLOR = '#F4AFB4'

/** Playfield background color. */
export const SCREEN_BACKGROUND_COLOR = '#000'

/** Maximum rebound deflection off a paddle/block edge: 75 degrees, in radians. */
export const MAX_BOUNCE_ANGLE = (5 * Math.PI) / 12
