var newPlayer = document.querySelector(".add__player");
var addButton = document.querySelector(".add__button");
var error = document.querySelector(".main__error");

var pointsValue = {
  victory: 3,
  draw: 1,
  lose: 0,
};
var players = [];

addButton.addEventListener("click", function () {
  if (newPlayer.value != "") {
    var newPlayerName = newPlayer.value;
    var player = {
      name: newPlayerName,
      victories: 0,
      draws: 0,
      loses: 0,
      points: 0,
    };
    newPlayer.value = "";
    players.push(player);
    showPlayers(players);
  } else {
    error.innerHTML = "Digite um nome para o jogador";
  }
});

function calcPoints(player) {
  var points =
    player.victories * pointsValue.victory + player.draws * pointsValue.draw;
  return points;
}

function showPlayers(players) {
  var element = "";
  for (var i = 0; i < players.length; i++) {
    element += "<tr><td>" + players[i].name + "</td>";
    element += "<td>" + players[i].victories + "</td>";
    element += "<td>" + players[i].draws + "</td>";
    element += "<td>" + players[i].loses + "</td>";
    element += "<td>" + players[i].points + "</td>";
    element +=
      "<td><button onclick='addVictory(" + i + ")'>Vitória</button></td>";
    element += "<td> <button onclick='addDraw(" + i + ")'>Empate</button></td>";
    element += "<td><button onclick='addLose(" + i + ")'>Derrota</button></td>";
    element +=
      "<td><button onclick='restartPoints(" + i + ")'>zerar</button></td>";
    element +=
      "<td><button onclick='removePlayer(" + i + ")'>Remover</button></td>";
    element += "</tr>";
  }

  var tabelaplayers = document.querySelector("#players__table");
  tabelaplayers.innerHTML = element;
  validPoints();
}

function addVictory(i) {
  var player = players[i];
  player.victories++;
  player.points = calcPoints(player);
  showPlayers(players);
}

function addDraw(i) {
  var player = players[i];
  player.draws++;
  player.points = calcPoints(player);
  showPlayers(players);
}

function addLose(i) {
  var player = players[i];
  player.loses++;
  showPlayers(players);
}

function restartPoints(i) {
  var player = players[i];
  player.victories = 0;
  player.draws = 0;
  player.loses = 0;
  player.points = 0;
  showPlayers(players);
}

function removePlayer(i) {
  players.splice(i, 1);
  showPlayers(players);
}

function validPoints() {
  var victoryNumber = 0;
  var drawNumber = 0;
  var loseNumber = 0;
  var valid = true;

  for (var i = 0; i < players.length; i++) {
    victoryNumber += players[i].victories;
    drawNumber += players[i].draws;
    loseNumber += players[i].loses;
  }

  error.innerHTML += "";

  if (victoryNumber != loseNumber) {
    valid = false;
    error.innerHTML = "O número de vitórias e de derrotas não é equivalente";
  } else {
    error.innerHTML = "";
  }
  if (!Number.isInteger(drawNumber / 2)) {
    valid = false;
    error.innerHTML = "O número de empates não pode ser ímpar";
  }
}

showPlayers();
