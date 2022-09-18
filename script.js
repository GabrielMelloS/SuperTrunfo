var Carta = function (nome, imagem, ataque, defesa, magia) {
  this.nome = nome;
  this.imagem = imagem;
  this.atributos = {
    ataque: ataque,
    defesa: defesa,
    magia: magia
  };
};

const deckJogador = [
  new Carta(
    "William Vangeance - Alvorecer Dourado",
    "https://i.ibb.co/XxN9rcP/Es-Ei-T9-ZVc-AYPs-Cd-Easy-Resize-com-2-Easy-Resize-com-1.jpg",
    80,
    65,
    77
  ),
  new Carta(
    "Yami Sukehiro - Touros Negros",
    "https://i.ibb.co/2gXMcYM/Ed-n-Lyu-UMAYN6j-D-1-Easy-Resize-com-2.jpg",
    93,
    80,
    90
  ),
  new Carta(
    "Nozel Silva - Águia Prateada",
    "https://i.ibb.co/jg20KYB/Es-QRLKLUw-AIVm4-Easy-Resize-com.jpg",
    70,
    60,
    70
  ),
  new Carta(
    "Charlotte Roselei - Rosa Azul",
    "https://i.ibb.co/0hv7hQr/Es-QOBs-PUw-AQYNP5-Easy-Resize-com.jpg",
    65,
    55,
    73
  ),
  new Carta(
    "Fuegoleon Vermillion - Leão Carmesim",
    "https://i.ibb.co/nnF7Rp9/Es-Fy7z-HU0-AALRMq-Easy-Resize-com.jpg",
    84,
    68,
    74
  ),
  new Carta(
    "Jack the Ripper - Gafanhoto Verde",
    "https://i.ibb.co/yp20Zvf/Es-QUqp3-Vo-AYr-Dn-D-Easy-Resize-com.jpg",
    60,
    50,
    60
  ),
  new Carta(
    "Dorothy Ansoit - Pavão Coral",
    "https://i.ibb.co/rbGQW1H/Es-QXBz9-Vc-AIFIFO-Easy-Resize-com.jpg",
    70,
    60,
    80
  ),
  new Carta(
    "Lil Bowamoltie - Veado Azul",
    "https://i.ibb.co/4gGzfVr/Es-QV2-G3-Vo-AIin-W-Easy-Resize-com.jpg",
    55,
    50,
    65
  ),
];

let deckMaquina = JSON.parse(JSON.stringify(deckJogador));

let cartaMaquina;
let cartaJogador;
function sortearCartas() {
  cartaMaquina = sortearCarta(deckMaquina);
  cartaJogador = sortearCarta(deckJogador);
  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  exibirOpcoes();
  exibirCartaJogador();
}

function sortearCarta(deck) {
  let numeroCartaRandomico = parseInt(Math.random() * deck.length);
  const cartaEscolhida = deck.splice(numeroCartaRandomico, 1)[0];
  return cartaEscolhida;
}

function realizarTroca(cartaDoada, deckGanhador) {
  deckGanhador.push(cartaDoada);
}

function exibirOpcoes() {
  let opcoes = document.getElementById("opcoes");
  let opcoesTexto = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTexto += `<input type="radio" name="atributo" value="${atributo}">${atributo}`;
  }
  opcoes.innerHTML = opcoesTexto;
  console.log(cartaJogador);
}

function exibirCartaJogador() {
  let elementoCarta = document.getElementById("carta-jogador");
  elementoCarta.innerHTML += `<img src="${cartaJogador.imagem}"/>`;
  let textoCarta = document.getElementById("atributos-carta");
  textoCarta.innerHTML = `<h2>${cartaJogador.nome}</h2>`;
  textoCarta.innerHTML += `<h3>Ataque: ${cartaJogador.atributos.ataque}</h3>`;
  textoCarta.innerHTML += `<h3>Defesa: ${cartaJogador.atributos.defesa}</h3>`;
  textoCarta.innerHTML += `<h3>Magia: ${cartaJogador.atributos.magia}</h3>`;
}

function exibirCartaMaquina() {
  let elementoCarta = document.getElementById("carta-maquina");
  elementoCarta.innerHTML += `<img src="${cartaMaquina.imagem}"/>`;
  let textoCarta = document.getElementById("atributos-maquina");
  textoCarta.innerHTML = `<h2>${cartaMaquina.nome}</h2>`;
  textoCarta.innerHTML += `<h3>Ataque: ${cartaMaquina.atributos.ataque}</h3>`;
  textoCarta.innerHTML += `<h3>Defesa: ${cartaMaquina.atributos.defesa}</h3>`;
  textoCarta.innerHTML += `<h3>Magia: ${cartaMaquina.atributos.magia}</h3>`;
}

function obtemAtributoSelecionado() {
  let radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked) {
      return radioAtributos[i].value;
    }
  }
}

function devolverCarta(cartaDevolvida, deckDestino) {
  deckDestino.push(cartaDevolvida);
}

function jogar() {
  let atributoSelecionado = obtemAtributoSelecionado();
  let elementoResultado = document.getElementById("resultado");
  let valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  let valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (atributoSelecionado === undefined) {
    elementoResultado.innerHTML = "Você precisa escolher um dos 3 atributos";
    return;
  } else if (valorCartaJogador > valorCartaMaquina) {
    realizarTroca(cartaMaquina, deckJogador);
    devolverCarta(cartaJogador, deckJogador);
    elementoResultado.innerHTML = "Você venceu!";
  } else if (valorCartaMaquina > valorCartaJogador) {
    realizarTroca(cartaJogador, deckMaquina);
    devolverCarta(cartaMaquina, deckMaquina);
    elementoResultado.innerHTML = "Você perdeu, a carta da máquina é maior!";
  } else {
    elementoResultado.innerHTML = "Empate";
    devolverCarta(cartaJogador, deckJogador);
    devolverCarta(cartaMaquina, deckMaquina);
  }
  exibirCartaMaquina();

  if (deckJogador.length == 0) {
    elementoResultado.innerHTML = "Acabaram suas cartas, você perdeu!";
    return;
  } else if (deckMaquina.length == 0) {
    elementoResultado.innerHTML = "Acabaram as cartas da máquina, você ganhou!";
    return;
  }
  document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogar").disabled = true;
}

function prepararNovaPartida() {
  let elementoCartaJogador = document.getElementById("carta-jogador");
  elementoCartaJogador.innerHTML = "";
  let textoCartaJogador = document.getElementById("atributos-carta");
  textoCartaJogador.innerHTML = "";
  let elementoCartaMaquina = document.getElementById("carta-maquina");
  elementoCartaMaquina.innerHTML = "";
  let textoCartaMaquina = document.getElementById("atributos-maquina");
  textoCartaMaquina.innerHTML = "";
  let elementoResultado = document.getElementById("resultado");
  elementoResultado.innerHTML = "";
}
