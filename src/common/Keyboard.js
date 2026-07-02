export default class Keyboard {
  static pressedKeys = {}

  constructor(selector) {
    this.element = selector ? document.querySelector(selector) : document

    this.keyDown = (event) => {
      Keyboard.pressedKeys[event.code] = true
    }

    this.keyUp = (event) => {
      Keyboard.pressedKeys[event.code] = false
    }
  }

  start() {
    this.element.addEventListener('keydown', this.keyDown)
    this.element.addEventListener('keyup', this.keyUp)
  }

  stop() {
    this.element.removeEventListener('keydown', this.keyDown)
    this.element.removeEventListener('keyup', this.keyUp)
  }

  static isDown(key) {
    return Keyboard.pressedKeys[key] === true
  }
}

window.GameKeyboard = new Keyboard()
window.GameKeyboard.start()
