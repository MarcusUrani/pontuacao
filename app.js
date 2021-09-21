var novoJogador = document.querySelector(".adicionar__jogador");

var botaoAdiciona = document.querySelector(".botao__adicionar");

var pontuacao = {
    vitoria: 3,
    empate: 1,
    derrota: 0
};

var validacao = document.querySelector(".validacao");

botaoAdiciona.addEventListener("click", function () {
    var novoJogadorNome = novoJogador.value;
    var jogadorNovo = {
        nome: novoJogadorNome,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        pontos: 0
    };
    novoJogador.value = "";
    jogadores.push(jogadorNovo);
    exibeJogadoresNaTela(jogadores);
});

function calculaPontos(jogador) {
    var pontos =
        jogador.vitorias * pontuacao.vitoria + jogador.empates * pontuacao.empate;
    return pontos;
}

var jogadores = [];

function exibeJogadoresNaTela(jogadores) {
    var elemento = "";
    for (var i = 0; i < jogadores.length; i++) {
        elemento += "<tr><td>" + jogadores[i].nome + "</td>";
        elemento += "<td>" + jogadores[i].vitorias + "</td>";
        elemento += "<td>" + jogadores[i].empates + "</td>";
        elemento += "<td>" + jogadores[i].derrotas + "</td>";
        elemento += "<td>" + jogadores[i].pontos + "</td>";
        elemento +=
            "<td><button onclick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
        elemento +=
            "<td> <button onclick='adicionarEmpate(" + i + ")'>Empate</button></td>";
        elemento +=
            "<td><button onclick='adicionarDerrota(" + i + ")'>Derrota</button></td>";
        elemento +=
            "<td><button onclick='zerarPontuacao(" + i + ")'>zerar</button></td>";
        elemento +=
            "<td><button onclick='removerJogador(" + i + ")'>Remover</button></td>";
        elemento += "</tr>";
    }

    var tabelaJogadores = document.querySelector("#tabela__jogadores");
    tabelaJogadores.innerHTML = elemento;
    validarPontos();
}

function adicionarVitoria(i) {
    var jogador = jogadores[i];
    jogador.vitorias++;
    jogador.pontos = calculaPontos(jogador);
    exibeJogadoresNaTela(jogadores);
}

function adicionarEmpate(i) {
    var jogador = jogadores[i];
    jogador.empates++;
    jogador.pontos = calculaPontos(jogador);
    exibeJogadoresNaTela(jogadores);
}

function adicionarDerrota(i) {
    var jogador = jogadores[i];
    jogador.derrotas++;
    exibeJogadoresNaTela(jogadores);
}

function zerarPontuacao(i) {
    var jogador = jogadores[i];
    jogador.vitorias = 0;
    jogador.empates = 0;
    jogador.derrotas = 0;
    jogador.pontos = 0;
    exibeJogadoresNaTela(jogadores);
}

function removerJogador(i) {
    jogadores.splice(i, 1);
    exibeJogadoresNaTela(jogadores);
}

function validarPontos() {
    var numeroVitorias = 0;
    var numeroEmpates = 0;
    var numeroDerrotas = 0;
    var valido = true;

    for (var i = 0; i < jogadores.length; i++) {
        numeroVitorias += jogadores[i].vitorias;
        numeroEmpates += jogadores[i].empates;
        numeroDerrotas += jogadores[i].derrotas;
    }

    validacao.innerHTML += "";

    if (numeroVitorias != numeroDerrotas) {
        valido = false;
        validacao.innerHTML =
            "O número de vitórias e de derrotas não é equivalente";
    } else {
        validacao.innerHTML = "";
    }
    if (!Number.isInteger(numeroEmpates / 2)) {
        valido = false;
        validacao.innerHTML = "O número de empates não pode ser ímpar";
    }
}

exibeJogadoresNaTela();
