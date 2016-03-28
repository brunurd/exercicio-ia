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
	}
}