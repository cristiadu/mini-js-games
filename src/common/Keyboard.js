export default class Keyboard {
  static mappedKeys = {}

  constructor(selector) {
    this.element = selector ? document.querySelector(selector) : document

    this.keyDown = (event) => {
      const evt = window.event || event
      const code = evt.which || evt.keyCode
      Keyboard.mappedKeys[code] = true
    }

    this.keyUp = (event) => {
      const evt = window.event || event
      const code = evt.which || evt.keyCode
      if (typeof (Keyboard.mappedKeys[code]) === 'boolean') {
        Keyboard.mappedKeys[code] = false
      }
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
    if (Keyboard.mappedKeys[key]) {
      return true
    }
    return false
  }
}

window.GameKeyboard = new Keyboard()
window.GameKeyboard.start()
