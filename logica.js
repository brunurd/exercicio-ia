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
			for (var j = i + 1; j < n; j++) {
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
		//this.matrizAdjacencia[verticeA.indice][verticeB.indice] = peso;
		//this.matrizAdjacencia[verticeB.indice][verticeA.indice] = peso;
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

	calcularDManhattan: function() { // tentar sem usar posição
		var vertx = (this.verticeDestino.x - this.verticeOrigem.x) / 140;
        var verty = 0;
        if(this.verticeDestino.y - this.verticeOrigem.y > 0){
            verty = 1;
        } 
        return vertx + verty;
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

			for (j in arestas) {
				if (arestas[j].peso < peso) {
					peso = arestas[j].peso;
					i = j;
				}
			}


			for (k in matriz[i]) {
				if (matriz[i][k] < chave[j]) {
					pai[k] = i;
					chave[k] = matriz[i][k];
				}
			}
		}
		*/

		console.log(chave);
		console.log(pai);
	}
}