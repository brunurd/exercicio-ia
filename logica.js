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

	calcularDManhattan: function(verticeA, verticeB) { 
		var dm = (verticeB.x - verticeA.x) + (verticeB.y - verticeA.y);
		if (dm < 0)
			return Math.sqrt(dm * -1);
		else
			return Math.sqrt(dm);
	},

	AEstrela: function(v) {
		var Q = [];
		Q.push(v[0]);
		// ...
	},

	prim: function(arestas, vertices) {
		var Q = vertices.slice(0);
		var pai = [];
		var chave = [];
		var matriz = this.matrizAdjacencia;

		for (i in Q) {
			pai.push(-1);
			chave.push(99);
		}

		chave[this.verticeOrigem.indice] = 0;

		/*
		while (Q != []) {
			var i = 0;
			var peso = 99;

			for (ii in arestas) {
				if (arestas[ii].peso < peso) {
					peso = arestas[ii].peso;
					i = ii;
				}
			}


			for (iii in matriz[i]) {
				if (matriz[i][iii] < chave[ii]) {
					pai[iii] = i;
					chave[iii] = matriz[i][iii];
				}
			}
		}
		*/

		console.log(chave);
		console.log(pai);
	}
}