const celulas = document.querySelectorAll(".cell");
let checarTurno = true;

const btn = document.querySelector("#send");
const nomePlayer1 = document.querySelector("#nomePlayer1");
const nomePlayer2 = document.querySelector("#nomePlayer2");

btn.addEventListener("click", function (e) {
    
  const receiveNames = document.getElementById("receive-names");
  receiveNames.style.display = "grid";
  e.preventDefault();
  const player1 = document.querySelector("#player1").value;
  const player2 = document.querySelector("#player2").value;
  nomePlayer1.innerHTML ='Vez de: ' + player1;
  nomePlayer2.innerHTML = 'Vez de: ' + player2;
  nomePlayer1.style.color = "blue";
  nomePlayer2.style.color = "white";
});

const JOGADOR_X = "X";
const JOGADOR_O = "O";

const COMBINACOES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("click", (event) => {
  if (event.target.matches(".cell")) {
    jogar(event.target.id);
  }
});

function jogar(id) {
  const celula = document.getElementById(id);
  turno = checarTurno ? JOGADOR_X : JOGADOR_O;
  celula.textContent = turno;
  celula.classList.add(turno);
  checarVencedor(turno);
}

function checarVencedor(turno) {
  const vencedor = COMBINACOES.some((comb) => {
    return comb.every((index) => {
      return celulas[index].classList.contains(turno);
    });
  });

  if (vencedor) {
    encerrarJogo(turno);
  } else if (checarEmpate()) {
    encerrarJogo();
  } else {
    checarTurno = !checarTurno;
    if (checarTurno == true) {
      nomePlayer2.style.color = "white";
      nomePlayer1.style.color = "blue";
    } else {
      nomePlayer1.style.color = "white";
      nomePlayer2.style.color = "blue";
    }
  }
}

function checarEmpate() {
  let x = 0;
  let o = 0;

  for (index in celulas) {
    if (!isNaN(index)) {
      if (celulas[index].classList.contains(JOGADOR_X)) {
        x++;
      }

      if (celulas[index].classList.contains(JOGADOR_O)) {
        o++;
      }
    }
  }

  return x + o == 9 ? true : false;
}

function encerrarJogo(vencedor = null) {
  const telaEscura = document.getElementById("tela-escura");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  let mensagem = null;

  telaEscura.style.display = "block";
  telaEscura.appendChild(h2);
  telaEscura.appendChild(h3);

  if (vencedor) {
    if (vencedor == "X") {
        h2.innerHTML = "Quem jogo com o 'X' venceu";
    }else
        h2.innerHTML = "Quem jogou com o 'O' venceu";

  } else {
    h2.innerHTML = "Empatou";
  }
  let contador = 3;

  setInterval(() => {
    h3.innerHTML = "Reiniciando em " + contador--;
  }, 1000);

  setTimeout(() => location.reload(), 4000);
}
