const EVENTS = {
  keyup: "keyup",
  keydown: "keydown"
};

class Keyboard {
  constructor(selector) {
    var self = this
    this.mapedKeys = {}
    this.element = selector ? document.querySelector(selector) : document

    this.keyDown = (event) => {
      var evt = window.event || event
      var code = evt.which || evt.keyCode
      self.mapedKeys[code] = true
    }

    this.keyUp = (event) => {
      var evt = window.event || event
      var code = evt.which || evt.keyCode
      if (typeof (self.mapedKeys[code]) == "boolean") {
        self.mapedKeys[code] = false
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

  isDown(key) {
    if (this.mapedKeys[key]) {
      return true
    } else {
      return false
    }
  }
}

window.Keyboard = new Keyboard()
window.Keyboard.start()
