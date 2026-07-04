import { Keys } from '../../../common/Keyboard.js'

/** Maps the snake's movement actions to the physical keys that trigger them. */
export const CONTROLS = {
  left: Keys.ARROW_LEFT,
  up: Keys.ARROW_UP,
  right: Keys.ARROW_RIGHT,
  down: Keys.ARROW_DOWN,
}

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

/** Head starting X position in pixels: two grid cells in, so the two starting body segments spawn on-screen. */
export const SNAKE_INITIAL_X = SIZE_SNAKE * 2

/** Head starting Y position in pixels: aligned to the same grid as the X position. */
export const SNAKE_INITIAL_Y = SIZE_SNAKE * 2

/** Food pellet fill color. */
export const FOOD_COLOR = '#EB9486'

/** Playfield background color. */
export const SCREEN_BACKGROUND_COLOR = '#000'

/** Head fill color. */
export const SNAKE_HEAD_COLOR = '#107E7D'

/** Body segment fill color. */
export const SNAKE_BODY_COLOR = '#C7EFCF'
