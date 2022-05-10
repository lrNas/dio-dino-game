const dino = document.getElementById('dino');
const background = document.getElementById('background');
const jogar = document.getElementById('start')
let jogando = false;
let banner = document.getElementById("points");
let highscorebanner = document.getElementById("highs");
let pulando = false;
let gameOver = false;
let posicao = 0;
let pontos = 0;
let highscore = 0;
let distancia = 2;
let alturamaxima = 25;
let hit = 10;
let velocidade = 8; 
let level = 0.0;


function handleKeyUp(event) {
  console.log(event.type)
  if (event.keyCode === 32 || (event.type === "mousedown" && jogando)) {
    if (!pulando) {
      jump();
    }
  }
}

function jump() {
  pulando = true;

  let upInterval = setInterval(() => {
    if (posicao >= alturamaxima) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (posicao <= 0) {
          clearInterval(downInterval);
          pulando = false;
        } else {
          posicao -= distancia;
          dino.style.bottom = posicao + 'vmin';
        }
      }, 20);
    } else {
      // Subindo
      posicao += distancia;
      dino.style.bottom = posicao + 'vmin';
    }
  }, 20);
}

function criarCacto() {
  if(jogando){
    jogar.style.display="none";
  }
  const cacto = document.createElement('div');
  let posicaoCacto = 250;
  let randomTime = Math.random() * 6000;

  if (gameOver) return;

  cacto.classList.add('cacto');
  background.appendChild(cacto);
  cacto.style.left = posicaoCacto + 'vmin';

  let leftTimer = setInterval(() => {
    if (posicaoCacto < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      pontos++;
      background.removeChild(cacto);
      banner.innerHTML = `Pontuação: ${pontos}`
    } else if (posicaoCacto > 0 && posicaoCacto < hit && posicao < hit) {
      // Game over
      clearInterval(leftTimer);
      gameOver = true;
      jogando = false;
      background.removeChild(cacto);
      highscore<pontos?highscore=pontos:false;
      background.style.animation = "none";
      jogar.style.display ="";
      highs.innerHTML="Highscore: "+highscore
      banner.innerHTML= 'Fim de jogo';
    } else {
      posicaoCacto -= distancia;
      cacto.style.left = posicaoCacto + 'vmin';
    }
  }, 20);
  setTimeout(criarCacto, randomTime);
}

function startGame(){
  jogar.style.display="none";
  setTimeout(()=>jogando = true,500);
  gameOver = false;
  background.style.animation = `slideright 500s infinite linear`;
  background.style.webkitAnimation = "slideright 500s infinite linear";
 pontos = 0;
  criarCacto();
}

jogar.onclick = startGame
// Colocar um keyup e um keydown, pra regular o tamanho do pulo
document.addEventListener('keypress', handleKeyUp);
document.addEventListener('mousedown', handleKeyUp)