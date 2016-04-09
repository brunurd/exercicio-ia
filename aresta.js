function Aresta() {};

Aresta.prototype = {
	A: {},
	B: {},
	cor: "#4e6b6b",
	peso: 0,

	ctor: function(A, B) {
		this.A = A;
		this.B = B;
	},

	mostrar: function(ctx) {
		ctx.strokeStyle = this.cor;
		ctx.beginPath();
		ctx.moveTo(this.A.x, this.A.y);
		ctx.lineTo(this.B.x, this.B.y);
		ctx.stroke();
	},

	pintar: function(v) {
		a = false;
		b = false;
		for (i in v) {
			if (v[i] == this.A && this.A.pintado)
				a = true;
			if (v[i] == this.B && this.B.pintado)
				b = true;
		}
		if (a && b)
			this.cor = "#2ed5b3";
	}
}