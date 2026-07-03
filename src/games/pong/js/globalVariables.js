import { Keys } from '../../../common/Keyboard.js'

/**
 * Playfield sides, used both for paddle placement and for which wall the ball went out on.
 * @enum {string}
 */
export const POSITION = {
  LEFT: 'Left',
  RIGHT: 'Right',
}

/**
 * What drives a paddle: arrow-key human, W/S second human, or the ball-tracking AI.
 * @enum {string}
 */
export const PLAYER_TYPE = {
  HUMAN: 'Human',
  HUMAN2: 'Human2',
  AI: 'AI',
}

/** Maps each human player type's movement actions to the physical keys that trigger them. */
export const CONTROLS = {
  [PLAYER_TYPE.HUMAN]: {
    up: Keys.ARROW_UP,
    down: Keys.ARROW_DOWN,
  },
  [PLAYER_TYPE.HUMAN2]: {
    up: Keys.W,
    down: Keys.S,
  },
}

/** Ball radius in pixels. */
export const BALL_RADIUS = 5

/** Ball speed in pixels per update after a serve. */
export const BALL_INITIAL_SPEED = 1

/** Paddle height in pixels. */
export const SIZE_PADDLE = 100

/** Paddle width in pixels. */
export const THICKNESS_PADDLE = 10

/** Human paddle speed in pixels per update while a movement key is held. */
export const SPEED_PADDLE = 4

/** AI paddle speed in pixels per update, kept below SPEED_PADDLE so the AI is beatable. */
export const REDUCED_SPEED_AI = 2

/** Ball fill color. */
export const BALL_COLOR = '#A288E3'

/** Paddle fill color. */
export const PADDLE_COLOR = '#E5DCC5'

/** Playfield background color. */
export const SCREEN_BACKGROUND_COLOR = '#000'

/** Score text color. */
export const TEXT_COLOR = '#C14953'

/** Maximum rebound deflection off a paddle edge: 75 degrees, in radians. */
export const MAX_BOUNCE_ANGLE = (5 * Math.PI) / 12
