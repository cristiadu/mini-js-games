/**
 * Travel directions for the head and body segments.
 * @enum {string}
 */
export const DIRECTION = {
  UP: 'Up',
  DOWN: 'Down',
  LEFT: 'Left',
  RIGHT: 'Right',
}

/** Update ticks a pellet may sit uneaten before it respawns elsewhere. */
export const TIMEOUT_FOOD = 3000

/** Food pellet width/height in pixels. */
export const FOOD_SIZE = 6

/** Cell size in pixels: the snake is drawn and moves in steps of this size. */
export const SIZE_SNAKE = 8

/** Head starting X position in pixels. */
export const SNAKE_INITIAL_X = 2

/** Head starting Y position in pixels. */
export const SNAKE_INITIAL_Y = 2

/** Food pellet fill color. */
export const FOOD_COLOR = '#EB9486'

/** Playfield background color. */
export const SCREEN_BACKGROUND_COLOR = '#000'

/** Head fill color. */
export const SNAKE_HEAD_COLOR = '#107E7D'

/** Body segment fill color. */
export const SNAKE_BODY_COLOR = '#C7EFCF'
