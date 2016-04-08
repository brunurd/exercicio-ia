function Logica() {};

Logica.prototype = {
	matrizAdjacencia: [],
	sequencia: [],
	verticeOrigem: {},
	verticeDestino: {},
	distanciaPercorrida: 0,
    sequenciaString : "",
    rodouAstar: false,
    tela: {},
    
    ctor: function(tela){
        this.tela = tela;
    },

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
        
        var pontoAtual = this.verticeOrigem;
        
        for(var i = 0; i < this.tela.arestas.length + 1; i++){
            this.sequencia.push(pontoAtual);
            console.log(pontoAtual.letra);
            console.log(this.verticeDestino.letra);
            if(pontoAtual.letra == this.verticeDestino.letra){
                console.log("Acabou");
                break;
            }
            //pegar os vizinhos do ponto atual
            //avaliar os pesos dos vizinhos do ponto atual
            var novoPonto = this.medirMelhoresVizinhosDe(pontoAtual);
            //inserir o ponto atual na sequencia
            //ponto atual vira o ponto inserido no proximo ponto
            console.log(novoPonto);
            pontoAtual = novoPonto;
            //repetir
        }
        this.pintaSequencia();
        this.rodouAStar = true;
	},
    
    medirMelhoresVizinhosDe: function(vertice){
        var melhorVizinho;
        
        var vizinhos = this.encontrarVizinhoDe(vertice);
        
        var pesos = [];
        var vertpesos = [];
        
        var verticeFinal;
        
        for(var i = 0; i < vizinhos.length; i++){
            pesos.push(this.matrizAdjacencia[vizinhos.x[i]][vizinhos.y[i]]);
            vertpesos.push(this.pegarVerticeDestino(vertice, vizinhos.x[i], vizinhos.y[i]));
        }
        
        //incompleto, vai retornar sempre o primeiro valor
        //precisa retornar o valor correto ainda
        console.log("arrumar este método");
        
        this.distanciaPercorrida += this.matrizAdjacencia[vizinhos.x[0]][vizinhos.y[0]];
        return this.pegarVerticeDestino(vertice, vizinhos.x[0], vizinhos.y[0]);
    },    
    
    pegarVerticeDestino: function(verticeOriginal, arestax, arestay){
        var letraOriginal = verticeOriginal.letra.charCodeAt();

        var letraCode = 0;
        if(letraOriginal != arestax + 65){
            letraCode = arestax + 65;
        } else {
            letraCode = arestay + 65;
        }
        return this.pegarVertice(String.fromCharCode(letraCode));
    },
    
    pegarVertice: function(letra){
        for(var i = 0; i < this.tela.vertices.length; i++){
            if(this.tela.vertices[i].letra == letra){
                return this.tela.vertices[i];
            }    
        }
    },
    
    encontrarVizinhoDe: function(vertice){
        var indiceVerticeNaMatriz = vertice.letra.charCodeAt() - 65;
        var x = [];
        var y = [];
        var length = 0;
        
        for(var j=0; j < this.matrizAdjacencia[indiceVerticeNaMatriz].length; j++){
            if((this.matrizAdjacencia[indiceVerticeNaMatriz][j] != 0)
            &&(indiceVerticeNaMatriz!=this.matrizAdjacencia[indiceVerticeNaMatriz].length-1)){
                x.push(indiceVerticeNaMatriz);
                y.push(j);
                length += 1;
            }
        }

        return {x: x, y: y, length: length};
    },
    
    magnitudeParaDestino: function(verticeOriginal){
        var magnitude = ((this.verticeDestino.x - verticeOriginal.x) + (this.verticeDestino.y - verticeOriginal.y)); 
        if(magnitude > 0) return magnitude;
        return magnitude * -1;  
    },
    
    pintaSequencia: function(){
        for(var i = 0; i < this.sequencia.length; i++){
            console.log(this.sequencia[i]);
            this.sequencia[i].pintar();
            this.sequenciaString += this.sequencia[i].letra;
        }        
        // this.sequenciaString += this.verticeDestino.letra;
        // this.verticeDestino.pintar();
    }
    
}