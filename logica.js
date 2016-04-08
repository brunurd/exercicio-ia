function Logica() {};

Logica.prototype = {
	matrizAdjacencia: [],
	sequencia: [],
	verticeOrigem: {},
	verticeDestino: {},
	distanciaPercorrida: 0,
    sequenciaString : "",
    rodouAstar: false,

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
        if(verticeA.letra.charCodeAt(0) < verticeB.letra.charCodeAt(0)){
		    this.matrizAdjacencia[verticeA.indice][verticeB.indice] = peso;            
        } else {
		    this.matrizAdjacencia[verticeB.indice][verticeA.indice] = peso; 
        }
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
    
    origemEDestinoEstaoNaMesmaArvore: function(origem, destino){
        //verificar se o ponto de origem e destino estão conectados
        return true;
    },
    
    calcularManhattanEntreDoisQuaisquerPontos: function(pontoA, pontoB){
		var vertx = 0;
        var verty = 0;
        vertx = Math.abs(pontoB.x - pontoA.x) / 140;        
        if(pontoB.y - pontoA.y != 0){
            verty = 1;
        }
        return Math.abs(vertx + verty);        
    },

	AEstrela: function() {
        if(this.rodouAStar) {
            return;
        }
        
        console.log(this.matrizAdjacencia);
        
        //push adiciona no fim
        //unshift adiciona no comeco
        //pop remove o ultimo e retorna ele
        
        var pontoAtual = this.verticeOrigem;
        
        if(pontoAtual == this.verticeDestino){
            console.log("Acabou");
            return;
        }
        
        //pegar os vizinhos do ponto atual
        //avaliar os pesos dos vizinhos do ponto atual
        var novoPonto = this.medirMelhoresVizinhosDe(pontoAtual);
        //inserir o ponto atual na sequencia
        this.sequencia.push(pontoAtual);
        //ponto atual vira o ponto inserido no proximo ponto
        pontoAtual = novoPonto;
        //distanciaPercorrida += valor da aresta
         
        //repetir
        
        this.rodouAStar = true;
	},
    
    medirMelhoresVizinhosDe: function(vertice){
        var melhorVizinho;
        console.log("medindo vizinhos");
        var vizinhos = this.encontrarVizinhoDe(vertice);
        console.log(vizinhos);
        
        
        console.log(vizinhos.vizinhosX[0]);
        console.log(vizinhos.vizinhosY[0]);
        console.log(vizinhos.vizinhosX[1]);
        console.log(vizinhos.vizinhosY[1]);
        console.log(vizinhos.vizinhosX[2]);
        console.log(vizinhos.vizinhosY[2]);
        

        console.log("não medindo vizinhos");
        return melhorVizinho;
    },    
    
    encontrarVizinhoDe: function(vertice){
        var indiceVerticeNaMatriz = vertice.letra.charCodeAt() - 65;
        var vizinhosX = [];
        var vizinhosY = [];
        
        for(var j=0; j < this.matrizAdjacencia[indiceVerticeNaMatriz].length; j++){
            if(this.matrizAdjacencia[indiceVerticeNaMatriz][j] != 0){
                vizinhosX.push(indiceVerticeNaMatriz);
                vizinhosY.push(j);
            }
        }

        return {vizinhosX: vizinhosX, vizinhosY: vizinhosY};
    },
    
    magnitudeParaDestino: function(verticeOriginal){
        var magnitude = ((this.verticeDestino.x - verticeOriginal.x) + (this.verticeDestino.y - verticeOriginal.y)); 
        if(magnitude > 0) return magnitude;
        return magnitude * -1;  
    },
    
    pintaSequencia: function(){
        var vert;
        for(vert in sequencia){
            vert.pintar();
            sequenciaString += vert.letra;
        }
        
    }
    
}