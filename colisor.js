function Colisor() {};

Colisor.prototype = {
	A: {},
	B: {},
	width: 0,
	height: 0,

	ctor(x,y,width,height) {
		this.A = {x:0, y:0};
		this.B = {x:0, y:0};
		this.A.x = x;
		this.A.y = y;
		this.B.x = x + width;
		this.B.y = y + height;
		this.width = width;
		this.height = height;
	},

	colisaoPonto : function(x,y) {
		if (x >= this.A.x && y >= this.A.y && x <= this.B.x && y <= this.B.y)
			return true;
		else
			return false;
	},

	colisaoCaixa: function(colisor1, colisor2) {
		if (colisor1.B.y < colisor2.A.y || colisor1.A.y > colisor2.B.y ||
			colisor1.B.x < colisor2.A.x || colisor1.A.x > colisor2.B.x)
			return false;
		else
			return true;
	},

	translacao : function(x, y) {
		this.A.x += x;
		this.A.y += y;
		this.B.x += x;
		this.B.y += y;
	},

	destroy: function() {
		this.A.x = 0;
		this.A.y = 0;
		this.B.x = 0;
		this.B.y = 0;
		this.width = 0;
		this.height = 0;
	}
}