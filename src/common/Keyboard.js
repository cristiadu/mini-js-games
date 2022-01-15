const EVENTS = {
  keyup: "keyup",
  keydown: "keydown"
};

export default class Keyboard {
  static mappedKeys = {}

  constructor(selector) {
    this.element = selector ? document.querySelector(selector) : document

    this.keyDown = (event) => {
      var evt = window.event || event
      var code = evt.which || evt.keyCode
      Keyboard.mappedKeys[code] = true
    }

    this.keyUp = (event) => {
      var evt = window.event || event
      var code = evt.which || evt.keyCode
      if (typeof (Keyboard.mappedKeys[code]) == "boolean") {
        Keyboard.mappedKeys[code] = false
      }
    }
  }

  start() {
    this.element.addEventListener("keydown", this.keyDown)
    this.element.addEventListener("keyup", this.keyUp)
  }

  stop() {
    this.element.removeEventListener("keydown", this.keyDown)
    this.element.removeEventListener("keyup", this.keyUp)
  }

  static isDown(key) {
    if (Keyboard.mappedKeys[key]) {
      return true
    } else {
      return false
    }
  }
}

if (window.GameKeyboard == null) {
  window.GameKeyboard = new Keyboard()
}
window.GameKeyboard.start()
