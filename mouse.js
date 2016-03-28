function Mouse() {};

Mouse.prototype = {
	x : 0,
	y : 0,
	pressed : false,

	ctor: function(canvas) {
		var m = this;

		window.addEventListener("mousemove", function(event) {
			var rect = canvas.getBoundingClientRect();
			m.x = event.clientX - rect.left,
			m.y = event.clientY - rect.top
		});

		
		window.addEventListener("mousedown", function() {
			m.pressed = true;
		});

		window.addEventListener("mouseup", function() {
			m.pressed = false;
		});
	},

	click: function(colisor) {
		if (colisor.colisaoPonto(this.x, this.y) && this.pressed == true)
			return true;
	},

	drag: function(colisor) {
		var m1 = [this.x, this.y];
		var m2 = this;
		setTimeout(function() {
			colisor.translacao(m2.x - m1[0], m2.y - m1[1]);
		}, 16);
	}
}