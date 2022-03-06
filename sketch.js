//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velXBolinha = 6;
let velYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound('trilha.mp3');
  ponto = loadSound('ponto.mp3');
  raquetada = loadSound('raquetada.mp3');
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  inverteMovimento();
  criaRaquete(xRaquete,yRaquete);
  criaRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaquete();
  //verificaColisao();
  verificaColisaoRaquete(xRaquete,yRaquete);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha() {
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha() {
  xBolinha += velXBolinha;
  yBolinha += velYBolinha;
}

function inverteMovimento() {
  if(xBolinha + raio > width | xBolinha - raio < 0) {
    velXBolinha *= -1;    
  } 
  
  if(yBolinha + raio > height | yBolinha - raio < 0) {
    velYBolinha *= -1;
  }
}

function criaRaquete(x,y) {
  rect(x,y,larguraRaquete,alturaRaquete);
}


function movimentaRaquete() {
  if(keyIsDown(UP_ARROW) && yRaquete > 0) {
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW) && yRaquete < 310) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
   if(keyIsDown(87) && yRaqueteOponente > 0) {
    yRaqueteOponente -= 10;
  }
  
  if(keyIsDown(83) && yRaqueteOponente < 310) {
    yRaqueteOponente += 10;
  }
  
}


function verificaColisao() {
  if(xBolinha - raio < xRaquete + larguraRaquete 
     && yBolinha - raio < yRaquete + alturaRaquete 
     && yBolinha + raio > yRaquete) {
    velXBolinha *= -1;
    raquetada.play();
  }
  
}

function verificaColisaoRaquete(x,y) {
  colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, diametro);
  if(colidiu) {
    velXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 40, 0))
  rect(150, 10 , 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 40, 0))
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26)
  
}

function marcaPonto() {
  if(xBolinha + raio > 599) {
    meusPontos+=1;
    ponto.play();
  }
  if(xBolinha - raio < 1) {
    pontosOponente+=1;
    ponto.play();
  }
}

