function Vertice() {};

Vertice.prototype = {
	raio: 0,
	x: 0,
	y: 0,
	col: {},
	indice: -1,
	letra: '',
	cor: "",
	estaEmCima: false,
	selecionado: false,
    pintado: false,
	distanciaManhattan: 0,

	ctor: function(x,y,estaEmCima) {
		this.x = x;
		this.y = y;
		this.col = new Colisor();
		this.col.ctor(x - 20, y - 20, 40, 40);
		this.col.active = false;
		this.estaEmCima = estaEmCima;
	},

	colResize: function(w,h) {
		this.col.A.x = this.x - 20;
		this.col.A.y = this.y - 20;
		this.col.B.x = (this.x - 20) + w;
		this.col.B.y = (this.y - 20) + h;
	},

	translacao: function(x,y) {
		this.x += x;
		this.y += y;
		this.col.translacao(x,y);
	},

	mostrar: function(ctx) {
        if(this.pintado)
            this.cor = "#2ed5b3";
        else if (this.selecionado)
			this.cor = "#d3cc32";
		else
			this.cor = "#4e6b6b";
		if (this.raio < 20)
			this.raio = (this.raio + 2);
		ctx.strokeStyle = this.cor;
		ctx.fillStyle = "#FFF";
		ctx.lineWidth = 8 ;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.font = "20px Verdana";
		ctx.textAlign = "center";
		ctx.fillStyle = this.cor;
		ctx.fillText(this.letra, this.x, this.y + 6);
	},

	esconder: function(ctx) {
		if (this.raio > 0)
			this.raio = (this.raio - 2);
		ctx.strokeStyle = "#4e6b6b";
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI);
		ctx.stroke();
	},
    
    pintar: function(){
        this.pintado = true;
    }
}