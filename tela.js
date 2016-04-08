function Tela() {};

Tela.prototype = {
    canvas : {},
    ctx : {},
    painel: {},
 	painelH: {},
 	painelNome: {},
 	painelContent: {},
 	painelParte1: {},
 	painelParte2: {},
 	painelParte3: {},
 	mouse: {},
 	verticesReturn: {},
 	addBtn: {},
 	subtBtn: {},
 	minBtn: {},
 	btnOk1: {},
 	btnOk2: {},
 	btnOk3: {},
 	alert1: {},
 	alert2: {},
 	alert3: {},
 	col: {},
 	m1: {},
 	m2: {},
 	logica: {},
	pontoAAresta: {},
    pontoBAresta: {},
    limparArestas: {},
    limparOrigemDestino: {},
    matrizAdjacenciaLabel: {},
    distanciaManhattanLabel: {},
    sequenciaLabel: {},
    distanciaPercorridaLabel: {},
 	vertices: [],
 	arestas: [],
 	origemDestino: [],
 	parte1: true,
 	parte2: false,
 	parte3: false,
 	parte4: false,
 	move: true,
    verticesQt: 0,
    painelMinimizado: false,
    pontoAArestaIndex: -1,
    pontoBArestaIndex: -1,
    tempoAresta: 60,
    corAresta: "#4e6b6b",

    ctor : function(id1, id2) {
    	// Referências ao canvas
    	this.canvas = document.getElementById(id1);
    	this.ctx = this.canvas.getContext("2d");
    	
    	// Referência ao mouse
    	this.mouse = new Mouse();
    	this.mouse.ctor(this.canvas);
    	
    	// Referência aos demais objetos
    	this.painel = document.getElementById(id2);
    	this.painelH = document.getElementById("painel-header");
    	this.painelContent = document.getElementById("painel-content");
    	this.painelNome = document.getElementById("painel-nome");
    	this.painelParte1 = document.getElementById("painel-parte-1");
    	this.painelParte2 = document.getElementById("painel-parte-2");
    	this.painelParte3 = document.getElementById("painel-parte-3");
    	this.painelParte4 = document.getElementById("painel-parte-4");
    	this.verticesReturn = document.getElementById("verticesQt");
    	this.addBtn = document.getElementById("addBtn");
    	this.subtBtn = document.getElementById("subtBtn");
    	this.minBtn = document.getElementById("painel-minizar");
    	this.btnOk1 = document.getElementById("ok1");
    	this.btnOk2 = document.getElementById("ok2");
    	this.btnOk3 = document.getElementById("ok3");
    	this.alert1 = document.getElementById("alert1");
    	this.alert2 = document.getElementById("alert2");
    	this.alert3 = document.getElementById("alert3");
    	this.limparArestas = document.getElementById("limpar-arestas");
    	this.limparOrigemDestino = document.getElementById("limpar-origem-destino");
    	this.origemLabel = document.getElementById("origem");
    	this.destinoLabel = document.getElementById("destino");
    	this.matrizAdjacenciaLabel = document.getElementById("matriz-adjacencia");
    	this.distanciaManhattanLabel = document.getElementById("distancia-manhattan");
    	this.sequenciaLabel = document.getElementById("sequencia");
    	this.distanciaPercorridaLabel = document.getElementById("distancia-percorrida");

    	// Criando um colisor para o painel
    	this.painel.col = new Colisor();
    	this.painel.col.ctor(10, 10, this.painelH.clientWidth, this.painelH.clientHeight);
    	this.painel.dragging = false;

    	// Dimensionando o canvas
    	this.resize();

    	// Criando um colisor para o canvas
		this.col = new Colisor();
    	this.col.ctor(0, 0, this.canvas.width, this.canvas.height);

    	var posX = this.canvas.width/4;
    	var posY = this.canvas.height/2;

    	this.logica = new Logica();

    	// Instanciando os vertices
    	for (i = 0; i < 10; i++) {
	    	this.vertices.push(new Vertice());
	    	
	    	if (i == 0)
		    	this.vertices[i].ctor(posX, posY, true);

		    else if (i % 2 == 0) { // É par
			    this.vertices[i].ctor(posX + (70 * i), posY, true);
			}
			
			else if (i % 2 == 1) { // É impar
				this.vertices[i].ctor(posX + (70 * (i - 1)), posY + 100, false);
			}

			this.vertices[i].indice = i;
			this.vertices[i].letra = String.fromCharCode(65+i);
	    }

	    var t = this; // Referência para os eventos
		
		// Eventos
    	window.addEventListener("resize", function() {
	    	t.resize();
    	});

    	this.addBtn.addEventListener("click", function() {
    		t.addVertice();
    	});

    	this.subtBtn.addEventListener("click", function() {
    		t.subtVertice();
    	});

    	this.minBtn.addEventListener("click", function() {
    		t.minimizar();
    	});

    	this.limparArestas.addEventListener("click", function() {
    		for (i in t.logica.matrizAdjacencia) {
    			for (ii in t.logica.matrizAdjacencia[i]) {
    				t.logica.matrizAdjacencia[i][ii] = 0;
    			}
    		}
    		t.arestas = [];
    	});

    	this.limparOrigemDestino.addEventListener("click", function() {
    		if (t.origemDestino[0]) {
	    		t.origemDestino[0].selecionado = false;
	    		t.origemLabel.innerHTML = '';
    		}
    		if (t.origemDestino[1]) {
    			t.origemDestino[1].selecionado = false;
    			t.destinoLabel.innerHTML = '';
    		}
    		t.origemDestino = [];
    	});

    	this.btnOk1.addEventListener("click", function() {
    		if (t.verticesQt > 1) {
	    		t.parte1 = false;
	    		t.parte2 = true;
	    		t.logica.popularMatriz(t.verticesQt);
	    	}
	    	else {
	    		t.alert1.innerHTML = "Você precisa de ao menos<br/>2 vértices para prosseguir.";
	    	}
    	});

    	this.btnOk2.addEventListener("click", function() {
            /*
            lógica que calcula pra saber se essa parada tá toda interconectada 
    		
            var Q = [];
    		var matriz = [];
            
    		for (i in t.logica.matrizAdjacencia) {
    			matriz.push([]);
    			matriz[i] = t.logica.matrizAdjacencia[i].slice(0);
    		}

    		var i = 0;
    		var ii = 0;
    		
    		Q.push(t.vertices[i]);

    		while (i < Q.length) {
	   			for (iii in matriz[ii]) {
					if (matriz[ii][iii] > 0) {
						var add = true;
						for (v in Q) {
							if (Q[v].letra == t.vertices[iii].letra) {
								add = false;
							}
						}
						if (add)
							Q.push(t.vertices[iii]);
					}
					matriz[ii][iii] = -1;
					matriz[iii][ii] = -1;
				}
				i += 1;
				if (Q[i])
					ii = Q[i].indice;
			}
    		if (Q.length == matriz.length) {
    		}
    		else
    			t.alert2.innerHTML = "Todos os vértices devem estar interligados.";
            */
            t.parte2 = false;
            t.parte3 = true;
    	});

    	this.btnOk3.addEventListener("click", function() {
            
            // calcular se o destino faz parte do mesmo caminho que a origem
            if(!t.logica.origemEDestinoEstaoNaMesmaArvore(t.origemDestino[0], t.origemDestino[1])){ 
    			t.alert3.innerHTML = "Origem e Destino não fazem parte da mesma árvore";
                return;
            }
            
            if (t.origemDestino.length < 2) {
                t.alert3.innerHTML = "É necessário selecionar ambos: origem e destino.";        
            }
            else {
                t.logica.origemEDestino(t.origemDestino[0], t.origemDestino[1]);
                
                var v = t.vertices;

                for (i = 0; i < t.logica.matrizAdjacencia.length; i++) {
                    v[i].distanciaManhattan = t.logica.calcularDManhattan(v[i], t.origemDestino[1]);
                }

                
                t.parte3 = false;
                t.parte4 = true;
            }
    	});

    	this.render();
    },

    minimizar: function() {
    	if (!this.painelMinimizado) {
    		this.painel.style.width = "auto";
    		this.painel.col.A.x += 260;
    		this.painel.col.width = 40;
    		this.painel.col.height = 40;
    		this.painel.col.B.x = this.painel.col.A.x + 40;
    		this.painel.col.B.y = this.painel.col.A.y + 40;
    		this.painel.style.left = this.painel.col.A.x + "px";
    		this.painelContent.style.display = "none";
    		this.painelH.style.borderRadius = "5px";
    		this.painelH.style.width = "auto";
    		this.painelNome.style.display = "none";
    		this.painelMinimizado = true;
    	}

    	else {
    		this.painel.style = "";
    		this.painelContent.style = "";
    		this.painelH.style = "";
    		this.painelNome.style = "";
    		this.painel.col.A.x -= 260;
    		this.painel.col.width = this.painelH.clientWidth;
    		this.painel.col.height = this.painelH.clientHeight;
    		this.painel.col.B.x = this.painel.col.A.x + this.painelH.clientWidth;
    		this.painel.col.B.y = this.painel.col.A.y + this.painelH.clientHeight;	
    		this.painel.style.top = this.painel.col.A.y + "px";
    		this.painel.style.left = this.painel.col.A.x + "px";
    		this.painelMinimizado = false;
    	}

    },

    mostrarCol: function(colisor) {
    	this.ctx.strokeStyle = "#0F0";
		this.ctx.lineWidth = '1';
		this.ctx.strokeRect(colisor.A.x, colisor.A.y, colisor.width, colisor.height);
    },

    resize : function() {
    	this.canvas.width = porcento(100,0);
    	this.canvas.height = porcento(0,100);
    	this.col.A = {x: 0, y: 0};
    	this.col.B = {x: this.canvas.width, y: this.canvas.height};
    },

    addVertice: function() {
    	if(this.verticesQt < 10)
	    	this.verticesQt += 1;
    },

    subtVertice: function() {
    	if(this.verticesQt > 0) {
    		this.verticesQt -= 1;
    	}
    },

    esconderMostrarPainel: function() {
		var block = "block";
		var none = "none";

		if (this.parte1)
			this.painelParte1.style.display = block;
		else
			this.painelParte1.style.display = none;

		if (this.parte2)
			this.painelParte2.style.display = block;
		else
			this.painelParte2.style.display = none;

		if (this.parte3)
			this.painelParte3.style.display = block;
		else
			this.painelParte3.style.display = none;

		if (this.parte4)
			this.painelParte4.style.display = block;
		else
			this.painelParte4.style.display = none;
    },

    parte1Painel: function() {
		if(this.parte1) {
			// Imprime a quantidade de vértices no painel
			this.verticesReturn.innerHTML = this.verticesQt;

			// Desativa botão de subtrair
			if (this.verticesQt == 0) {
				this.subtBtn.style.cursor = "default";
				this.subtBtn.style.opacity = "0.6";
				this.subtBtn.style.backgroundColor = "#83df86";
			}

			// Ativa botão de subtrair
			else
				this.subtBtn.style = "";

			// Desativa botão de adicionar
			if (this.verticesQt == 10) {
				this.addBtn.style.cursor = "default";
				this.addBtn.style.opacity = "0.6";
				this.addBtn.style.backgroundColor = "#83df86";
			}

			// Ativa botão de adicionar
			else
				this.addBtn.style = "";
		}
    },

    moverPainel: function() {
		var t = this;

		if (this.mouse.click(this.painel.col) && this.move) {
			setTimeout(function() {
				if (!t.painel.dragging)
					t.painel.dragging = true;
				else
					t.painel.dragging = false;
			}, 16);		
		}

		if (this.painel.col.colisaoPonto(this.mouse.x, this.mouse.y)) {
			if (this.painel.dragging)
				this.painel.style.cursor = "move";
			else
				this.painel.style.cursor = "pointer";
		}

		if (this.painel.dragging) {
			this.painel.col.A = {x: this.mouse.x - this.painel.col.width/2,
								y: this.mouse.y - this.painel.col.height/2};
			this.painel.col.B = {x: this.mouse.x + this.painel.col.width,
							y: this.mouse.y + this.painel.col.height};
			this.painel.style.top = this.painel.col.A.y + "px";
			this.painel.style.left = this.painel.col.A.x + "px";
		}
    },

    ligandoOsVertices: function() {
    	if (this.parte2) {
    		var m = this.mouse;
			for (i = 0; i < this.verticesQt; i++) {
				if (m.click(this.vertices[i].col) && this.move
					&& i != this.pontoBArestaIndex && this.tempoAresta == 60) {
					this.move = false;
					this.pontoAArestaIndex = i;
				}

				else if (this.tempoAresta < 60)
					this.tempoAresta++;

				else if (i == this.pontoBArestaIndex)
					this.pontoBArestaIndex = -1;
			}

			if (!this.move) {
				var pontoA = this.vertices[this.pontoAArestaIndex];
				this.pontoBAresta = {x: pontoA.x, y: pontoA.y};
				this.pontoAAresta = {x: m.x, y: m.y};
				this.ctx.strokeStyle = this.corAresta;
				this.ctx.beginPath();
				this.ctx.moveTo(this.pontoAAresta.x, this.pontoAAresta.y);
				this.ctx.lineTo(this.pontoBAresta.x, this.pontoBAresta.y);
				this.ctx.stroke();

				for (i = 0; i < this.verticesQt; i++) {
					if (this.vertices[i].col.colisaoPonto(m.x, m.y)) {
						var pontoB = this.vertices[i];
						if (this.logica.checaIndiceAresta(pontoA, pontoB)) {
							this.corAresta = "#5ca166";
							break;
						}
						else {
							this.corAresta = "#dc4f29";
							break;
						}
					}

					else {
						this.corAresta = "#4e6b6b";
					}
				}

				for (i = 0; i < this.verticesQt; i++) {
					if (m.click(this.vertices[i].col) && !this.move && i != this.pontoAArestaIndex) {
						this.move = true;
						this.pontoBArestaIndex = i;
						this.tempoAresta = 0;
						pontoB = this.vertices[i];
						if (this.logica.checaIndiceAresta(pontoA, pontoB)) {
							this.arestas.push(new Aresta());
							this.arestas[-1 + this.arestas.length].ctor(pontoA, pontoB);
							this.arestas[-1 + this.arestas.length].peso = this.logica.geraPeso(pontoA, pontoB);
							this.logica.geraAresta(pontoA, pontoB);
						}
					}
				}
			}
		}
    },

    selecaoOrigemDestino: function() {
    	if (this.parte3) {
    		for (i in this.vertices) {
    			if (this.mouse.click(this.vertices[i].col)) {
    				if (this.origemDestino.length < 2 && this.vertices[i] != this.origemDestino[0]) {
    					this.vertices[i].selecionado = true;
    					this.origemDestino.push(this.vertices[i]);
    					break;
    				}
    			}
    		}
    		if (this.origemDestino[0])
	    		this.origemLabel.innerHTML = this.origemDestino[0].letra;
    		if (this.origemDestino[1])
    			this.destinoLabel.innerHTML = this.origemDestino[1].letra;
    	}
    },


    arredondar: function(n) {
    	return (Math.floor(n/0.1))/10;
    },

    mostrarResultado: function() {
    	if (this.parte4) {
            this.logica.AEstrela();
            this.mostrarAdjacencia();
	    	this.mostrarManhattan();
            this.mostrarSequencia();            
            this.mostrarDistanciaPercorrida();
	    }
    },
    
    
    mostrarAdjacencia: function(){
        var m = this.logica.matrizAdjacencia;
        var linha = "";

        this.matrizAdjacenciaLabel.innerHTML = "Matriz de adjacência: <br/>";
        
        linha += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

        for(var i = 0; i < m.length; i++){
            linha += String.fromCharCode(65+i) + "&nbsp;&nbsp;&nbsp;&nbsp;";
        }

        linha += "<br/><br/>";

        this.matrizAdjacenciaLabel.innerHTML += linha;

        for (var i = 0; i < m.length; i++) {
            linha = String.fromCharCode(65+i) + "&nbsp;&nbsp;&nbsp;";
            for (ii in m[i]) {
                linha += this.arredondar(m[i][ii]).toString() + "&nbsp;&nbsp;&nbsp;";
            }
            linha += "<br/>";
            this.matrizAdjacenciaLabel.innerHTML += linha;
        }        
    },

    mostrarManhattan: function(){                                
        var manhattan = this.logica.calcularDManhattan().toString();
        this.distanciaManhattanLabel.innerHTML = "Distância Manhattan: " + manhattan + "<br/";
    },
    
    mostrarSequencia: function(){
        this.sequenciaLabel.innerHTML = "Sequência: " + this.logica.sequenciaString;
    },
    
    mostrarDistanciaPercorrida: function(){
        this.distanciaPercorridaLabel.innerHTML = "Distância percorrida pelo agente: " + this.logica.distanciaPercorrida;  
    },

    render : function() {
    	var t = this;
    	var m = this.mouse;

		this.ctx.fillStyle = "#FFF";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.esconderMostrarPainel();
		this.parte1Painel();

		// Esconder os vértices
		for (i = this.verticesQt; i < 10; i++) {
			this.vertices[i].esconder(this.ctx);
			this.vertices[i].col.destroy();
		}

		// Muda o cursor para indicar que é clicável
			if (this.vertices[0].col.colisaoPonto(m.x,m.y) || this.vertices[1].col.colisaoPonto(m.x,m.y) ||
				this.vertices[2].col.colisaoPonto(m.x,m.y) || this.vertices[3].col.colisaoPonto(m.x,m.y) ||
				this.vertices[4].col.colisaoPonto(m.x,m.y) || this.vertices[5].col.colisaoPonto(m.x,m.y) ||
				this.vertices[6].col.colisaoPonto(m.x,m.y) || this.vertices[7].col.colisaoPonto(m.x,m.y) ||
				this.vertices[8].col.colisaoPonto(m.x,m.y) || this.vertices[9].col.colisaoPonto(m.x,m.y))
			{
				if (this.parte2 || this.parte3) {
					this.canvas.style.cursor = "pointer";
				}
				else
					this.canvas.style.cursor = "default";
			}
			else
				this.canvas.style.cursor = "default";

		// moverPainel();
		
		// O usuário pode mover a posição dos vértices
		if (!this.mouse.click(this.painel.col) && this.move) {
			if (this.mouse.click(this.col)) {
				
				this.canvas.style.cursor = "move";
				
				var m1 = [this.mouse.x, this.mouse.y];
				var m2 = this.mouse;

				setTimeout(function() {
					for (ii in t.vertices)
						t.vertices[ii].translacao(m2.x - m1[0], m2.y - m1[1]);
				},16);
			}
		}

		this.ligandoOsVertices();
		this.selecaoOrigemDestino();
		this.mostrarResultado();

		// Mostrar as arestas
		for (i in this.arestas) {
			this.arestas[i].mostrar(this.ctx);
		}

		// Mostrar os vértices
		for (i = 0; i < this.verticesQt; i++) {
			this.vertices[i].mostrar(this.ctx);
			this.vertices[i].col.ctor(this.vertices[i].x - 20, this.vertices[i].y - 20, 40, 40);
		}
        
        // Fim do loop principal
        setTimeout(function() {
        	t.render();
        },16);
    }
}

function porcento(width, height, elemento) {
	if(elemento === undefined) {
		if (width > 0 && height == 0)
			return (window.innerWidth/100)*width;
		else if (height > 0 && width == 0)
			return (window.innerHeight/100)*height;
		else
			return {
				width:(window.innerWidth/100)*width,
				height:(window.innerHeight/100)*height
			};
	}

	else {
		if (width > 0 && height == 0)
			return (elemento.width/100)*width;
		else if (height > 0 && width == 0)
			return (elemento.height/100)*height;
		else
			return {
				width:(elemento.width/100)*width,
				height:(elemento.height/100)*height
			};
	}
}