/**
 * Keydown/keyup listener that records pressed keys in a static map, keyed by
 * KeyboardEvent.code (e.g. 'ArrowLeft', 'KeyW'). A global singleton is
 * self-registered on load as window.GameKeyboard; games poll input inside
 * their update() via the static Keyboard.isDown(code).
 */
export default class Keyboard {
  /** @type {Object<string, boolean>} Pressed state per KeyboardEvent.code, shared by all instances. */
  static pressedKeys = {}

  /**
   * Creates a listener bound to an element (or the whole document).
   *
   * @param {string} [selector] Optional CSS selector for the element to listen on; defaults to document.
   */
  constructor(selector) {
    this.element = selector ? document.querySelector(selector) : document

    /**
     * Marks the event's key as pressed.
     * @param {KeyboardEvent} event
     */
    this.keyDown = (event) => {
      Keyboard.pressedKeys[event.code] = true
    }

    /**
     * Marks the event's key as released.
     * @param {KeyboardEvent} event
     */
    this.keyUp = (event) => {
      Keyboard.pressedKeys[event.code] = false
    }
  }

  /** Attaches the keydown/keyup listeners to the target element. */
  start() {
    this.element.addEventListener('keydown', this.keyDown)
    this.element.addEventListener('keyup', this.keyUp)
  }

  /** Detaches the keydown/keyup listeners from the target element. */
  stop() {
    this.element.removeEventListener('keydown', this.keyDown)
    this.element.removeEventListener('keyup', this.keyUp)
  }

  /**
   * Reports whether a key is currently held down.
   *
   * @param {string} key KeyboardEvent.code to check, e.g. 'ArrowUp'.
   * @returns {boolean} True while the key is pressed.
   */
  static isDown(key) {
    return Keyboard.pressedKeys[key] === true
  }
}

window.GameKeyboard = new Keyboard()
window.GameKeyboard.start()
