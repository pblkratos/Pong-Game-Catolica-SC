var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
let play = document.querySelector("#play");

function playing(){
	play.setAttribute("disabled",true);
	document.body.appendChild(canvas);
	canvas.removeAttribute("hidden");
	let player1 = document.getElementById("player1").value;
	let player2 = document.getElementById("player2").value;

	var teclas = {};

	var bola = {
		x: canvas.width / 2 - 15,
		y: canvas.height / 2 - 15,
		altura: 30,
		largura: 30,
		dirx: -1,
		diry: 1,
		mod: 0,
		speed: 0.7
	};

	var esquerda = {
		x: 0,
		y: canvas.height / 2 - 60,
		altura: 120,
		largura: 10,
		score: 0,
		speed: 8
	};

	var direita = {
		x: 590,
		y: canvas.height / 2 - 60,
		altura: 120,
		largura: 10,
		score: 0,
		speed: 8
	};

	player1 == "" ? player1="Player 1" : player1=player1;
	player2 == "" ? player2="Player 2" : player2=player2;

	document.addEventListener("keydown", function (e) {
		teclas[e.keyCode] = true;
	}, false);

	document.addEventListener("keyup", function(e) {
		delete teclas[e.keyCode];
	}, false);

	function moveblock() {
		if(87 in teclas && esquerda.y > 0)
				esquerda.y -= esquerda.speed;
		else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
				esquerda.y += esquerda.speed;
		if(38 in teclas && direita.y > 0)
				direita.y -= direita.speed;
		else if(40 in teclas && direita.y + direita.altura < canvas.height)
				direita.y += direita.speed;
	};

	function moveBola () {
		if (bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura){
			bola.dirx = 1;
			bola.mod += 0.2;
		}
		else if (bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x){
			bola.dirx = -1;
			bola.mod += 0.2;
		}
		if (bola.y <= 0)
			bola.diry = 1;
		else if (bola.y + bola.altura >= canvas.height)
			bola.diry = -1;
			bola.x += (bola.speed + bola.mod) * bola.dirx;
			bola.y += (bola.speed + bola.mod) * bola.diry;
		if(bola.x < esquerda.x + esquerda.largura - 15){
			newGame(player2);
		}else if (bola.x + bola.largura > direita.x + 15){
			newGame(player1);
		};
	};

	function placar(winner){
		h1 = document.querySelector("#campeao");
		h1.innerHTML = ("Campeão: " + winner);
	};

	function newGame(winner) {
		if (winner == player1)
			++esquerda.score;
		else
			++direita.score;
			esquerda.y = canvas.height / 2 - esquerda.altura / 2
			direita.y = esquerda.y;
			bola.y = canvas.height / 2 - bola.altura / 2;
			bola.x = canvas.width /2 - bola.largura /2;
			bola.mod = 0

		if(esquerda.score == 3){
			placar(player1);
		}else if(direita.score == 3)
			placar(player2);
		};

	function desenha() {

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		moveblock();
		moveBola();

		ctx.fillStyle = "white";
		ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
		ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
		ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);

		ctx.font = "20px Arial";
		ctx.fillText(player1 + " : " + esquerda.score, 50, 20);
		ctx.fillText(player2 + " : " + direita.score, canvas.width - 150, 20);

	};

	setInterval(desenha, 5)
}

play.addEventListener("click", playing, false);