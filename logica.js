function Logica() {};

Logica.prototype = {
	matrizAdjacencia: [],
	sequencia: [],
	verticeOrigem: {},
	verticeDestino: {},
	distanciaPercorrida: 0,

	popularMatriz : function(n) {
		for (var i = 0; i < n; i++) {
			this.matrizAdjacencia.push([]);
			for (var ii = 0; ii < n; ii++) {
				this.matrizAdjacencia[i].push(0);
			}
		}
	},

	checaIndiceAresta : function(verticeA, verticeB) {
		var Ai = verticeA.indice;
		var Bi = verticeB.indice;

		if (verticeA.estaEmCima == true) {
			if( Bi == Ai - 2|| // esquerda
				Bi == Ai - 1 || // baixo esquerda
				Bi == Ai + 1 || // baixo
				Bi == Ai + 3 || // baixo direita
				Bi == Ai + 2 ) // direita
			{
				return true;
			} else {
				return false;
			}
		}

		else {
			if( Bi == Ai - 2 || // esquerda
				Bi == Ai - 3 || // cima esquerda
				Bi == Ai - 1 || // cima
				Bi == Ai + 1 || // cima direita
				Bi == Ai + 2 ) // direita
			{
				return true;
			} else {
				return false;
			}
		}
	},

	geraAresta: function(verticeA, verticeB) {
		var peso = this.geraPeso(verticeA, verticeB);
		this.matrizAdjacencia[verticeA.indice][verticeB.indice] = peso;
		this.matrizAdjacencia[verticeB.indice][verticeA.indice] = peso;
	},

	geraPeso: function(verticeA, verticeB) {
		var raizDeDois = Math.sqrt(2);
		var Ai = verticeA.indice;
		var Bi = verticeB.indice;

		if (verticeA.estaEmCima && Bi == (Ai + 3))
			return raizDeDois;

		else if (!verticeA.estaEmCima && Bi == (Ai - 3))
			return raizDeDois;

		else if (verticeA.estaEmCima && Bi == (Ai - 1))
			return raizDeDois;

		else if (!verticeA.estaEmCima && Bi == (Ai + 1))
			return raizDeDois;
		
		else
			return 1;
	},

	origemEDestino: function(verticeA, verticeB) {
		this.verticeOrigem = verticeA;
		this.verticeDestino = verticeB;
	},

	calcularDManhattan: function() {
        return this.calcularManhattanEntreDoisQuaisquerPontos(this.verticeOrigem, this.verticeDestino);
	},
    
    calcularManhattanEntreDoisQuaisquerPontos: function(pontoA, pontoB){
		var vertx = (pontoB.x - pontoA.x) / 140;
        var verty = 0;
        if(pontoB.y - pontoA.y > 0){
            verty = 1;
        } 
        return vertx + verty;        
    },

	AEstrela: function(v) {

	},
    
    magnitudeParaDestino: function(verticeOriginal){
        var magnitude = ((this.verticeDestino.x - verticeOriginal.x) + (this.verticeDestino.y - verticeOriginal.y)); 
        if(magnitude > 0) return magnitude;
        return magnitude * -1;  
    }
    
}