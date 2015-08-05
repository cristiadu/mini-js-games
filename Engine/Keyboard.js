(function ( ) {

	var EVENTS = {
		keyup: "keyup",
		keydown: "keydown"
	};

	function Keyboard ( selector ) {
		var self = this;
		this.mapedKeys = {};
		this.element = selector ? document.querySelector(selector) : document;

		this.keyDown = function ( event ) {
			var evt = window.event || event;
			var code = evt.which || evt.keyCode;
			self.mapedKeys[code] = true;
			console.log(code);
		};

		this.keyUp = function ( event ) {
			var evt = window.event || event;
			var code = evt.which || evt.keyCode;
			if(typeof(self.mapedKeys[code]) == "boolean")
				self.mapedKeys[code] = false;
		};
	}

	Keyboard.prototype.start = function ( ) {
		this.element.addEventListener("keydown", this.keyDown);
		this.element.addEventListener("keyup", this.keyUp);
	};

	Keyboard.prototype.stop = function ( ) {
		this.element.removeEventListener("keydown", this.keyDown);
		this.element.removeEventListener("keyup", this.keyUp);
	};

	Keyboard.prototype.isDown = function ( key ) {
		if(this.mapedKeys[key])
			return true;
		else
			return false;
	};

	window.Keyboard = new Keyboard();
	window.Keyboard.start();

})();
