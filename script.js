/* =========================================
   CONSTANTES
========================================= */

const sounds = {
  menu: new Audio("audio/Music.mp3"),
  easy: new Audio("audio/Facil.mp3"),
  medium: new Audio("audio/Medium.mp3"),
  extreme: new Audio("audio/Hard.mp3"),
  trio: new Audio("audio/Music.mp3"),
  win: new Audio("audio/celebracao.mp3"),
  lose: new Audio("audio/Apito.mp3"),
  confirm: new Audio("audio/SelecaoNome.mp3")
};

const baseImages = [
  { name: "Fuleco", src: "img/fuleco.jpg", label: "Fuleco" },
  { name: "Zakumi", src: "img/zakumi.jpg", label: "Zakumi" },
  { name: "Mascote 1990", src: "img/mascote1990.png", label: "Mascote 1990" },
  { name: "Mascote 1994", src: "img/mascote1994.webp", label: "Mascote 1994" },
  { name: "Mascote 1998", src: "img/mascote1998.jpg", label: "Mascote 1998" },
  { name: "Mascote 2002", src: "img/mascote2002.jpg", label: "Mascote 2002" },
  { name: "Mascote 2018", src: "img/mascote2018.webp", label: "Mascote 2018" },
  { name: "Mascote 2022", src: "img/mascote2022.webp", label: "Mascote 2022" }
];

const trioExtraCards = [
  { name: "Fuleco Ouro", src: "img/fuleco.jpg", label: "Fuleco Ouro" },
  { name: "Zakumi Turbo", src: "img/zakumi.jpg", label: "Zakumi Turbo" },
  { name: "Mascote 1990 Plus", src: "img/mascote1990.png", label: "Mascote 1990 Plus" },
  { name: "Mascote 1994 Plus", src: "img/mascote1994.webp", label: "Mascote 1994 Plus" },
  { name: "Mascote 1998 Plus", src: "img/mascote1998.jpg", label: "Mascote 1998 Plus" },
  { name: "Mascote 2002 Plus", src: "img/mascote2002.jpg", label: "Mascote 2002 Plus" },
  { name: "Mascote 2022 Plus", src: "img/mascote2022.webp", label: "Mascote 2022 Plus" }
];

const backImage = "img/trofeu.webp";

const MODE_TIMES = {
  easy: null,
  medium: 60,
  extreme: 30,
  trio: null
};

/* =========================================
   TELAS
========================================= */

const introScreen = document.getElementById("introScreen");
const rulesScreen = document.getElementById("rulesScreen");
const modeScreen = document.getElementById("modeScreen");
const soloNameScreen = document.getElementById("soloNameScreen");
const trioNameScreen = document.getElementById("trioNameScreen");
const difficultyScreen = document.getElementById("difficultyScreen");
const rankingScreen = document.getElementById("rankingScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

/* =========================================
   BOTÕES E INPUTS
========================================= */

const playBtn = document.getElementById("playBtn");
const rulesBtn = document.getElementById("rulesBtn");
const rankingBtn = document.getElementById("rankingBtn");
const soloModeBtn = document.getElementById("soloModeBtn");
const trioModeBtn = document.getElementById("trioModeBtn");
const soloContinueBtn = document.getElementById("soloContinueBtn");
const trioContinueBtn = document.getElementById("trioContinueBtn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn[data-mode]");
const backButtons = document.querySelectorAll(".backBtn");

const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const homeBtn = document.getElementById("homeBtn");

const retryBtn = document.getElementById("retryBtn");
const goRankingBtn = document.getElementById("goRankingBtn");
const goHomeBtn = document.getElementById("goHomeBtn");

const playerNameInput = document.getElementById("playerName");
const trioNameInputs = [
  document.getElementById("trioPlayer1"),
  document.getElementById("trioPlayer2"),
  document.getElementById("trioPlayer3")
];

/* =========================================
   GAME
========================================= */

const gameBoard = document.getElementById("gameBoard");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById("pairs");
const playerHud = document.getElementById("playerHud");
const soloHud = document.getElementById("soloHud");
const trioHud = document.getElementById("trioHud");
const trioHudNames = [
  document.getElementById("trioHudName0"),
  document.getElementById("trioHudName1"),
  document.getElementById("trioHudName2")
];
const trioHudPairs = [
  document.getElementById("trioHudPairs0"),
  document.getElementById("trioHudPairs1"),
  document.getElementById("trioHudPairs2")
];
const trioHudCards = [
  document.getElementById("trioCard0"),
  document.getElementById("trioCard1"),
  document.getElementById("trioCard2")
];
const currentTurnName = document.getElementById("currentTurnName");

/* =========================================
   OVERLAY
========================================= */

const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const overlayBtn = document.getElementById("overlayBtn");

/* =========================================
   GAME OVER
========================================= */

const finalTitle = document.getElementById("finalTitle");
const finalTime = document.getElementById("finalTime");
const finalMoves = document.getElementById("finalMoves");
const finalMode = document.getElementById("finalMode");
const soloResult = document.getElementById("soloResult");
const trioResult = document.getElementById("trioResult");
const trioPodium = document.getElementById("trioPodium");

/* =========================================
   RANKING
========================================= */

const rankingList = document.getElementById("rankingList");
const rankTabs = document.querySelectorAll(".rankTab");
const rankingBackBtn = document.getElementById("rankingBackBtn");
const rankingHomeBtn = document.getElementById("rankingHomeBtn");
const rankingTitle = document.getElementById("rankingTitle");

/* =========================================
   ESTADO
========================================= */

let playerName = "";
let currentMode = "";
let currentGameType = "solo";
let currentMusicKey = "menu";
let rankingFromGameOver = false;

let trioPlayers = [];
let trioScores = [0, 0, 0];
let trioTurnIndex = 0;

let timer = 0;
let timerInterval = null;
let gamePaused = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;
let totalPairs = 0;
let deck = [];
let clearRankingClicks = 0;
let audioUnlocked = false;

/* =========================================
   UTILS
========================================= */

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
}

function showScreen(screen) {
  hideAllScreens();
  screen.classList.add("active");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function formatTime(total) {
  if (total === null) return "∞";

  const min = String(Math.floor(total / 60)).padStart(2, "0");
  const sec = String(total % 60).padStart(2, "0");

  return `${min}:${sec}`;
}

function isTrioMode() {
  return currentMode === "trio";
}

function getModeLabel(mode) {
  const modeNames = {
    easy: "Fácil",
    medium: "Médio",
    extreme: "Difícil",
    trio: "Modo Trio"
  };

  return modeNames[mode] || "Desconhecido";
}

function safePlay(audio) {
  if (!audio) return;
  audio.play().catch(() => {});
}

/* =========================================
   AUDIO
========================================= */

function stopAllMusic() {
  Object.values(sounds).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
}

function playMusic(type) {
  stopAllMusic();

  const sound = sounds[type];
  if (!sound) return;

  sound.loop = true;
  sound.volume = 0.5;
  safePlay(sound);
}

function ensureMenuMusic() {
  if (sounds.menu.paused) {
    playMusic("menu");
  }
}

function unlockAudio() {
  if (audioUnlocked) return;

  audioUnlocked = true;

  Object.values(sounds).forEach(sound => {
    sound.play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
      })
      .catch(() => {});
  });
}

/* =========================================
   HUD
========================================= */

function updateHUD() {
  if (isTrioMode()) {
    trioPlayers.forEach((name, index) => {
      trioHudNames[index].textContent = name;
      trioHudPairs[index].textContent = trioScores[index];
      trioHudCards[index].classList.toggle("active-turn", index === trioTurnIndex);
    });

    currentTurnName.textContent = trioPlayers[trioTurnIndex] || "---";
    return;
  }

  playerHud.textContent = playerName;
  timerEl.textContent = formatTime(timer);
  movesEl.textContent = moves;
  pairsEl.textContent = `${matches} / ${totalPairs}`;
}

function configureLayout() {
  const trio = isTrioMode();

  soloHud.classList.toggle("hidden", trio);
  trioHud.classList.toggle("hidden", !trio);

  gameBoard.classList.toggle("solo-board", !trio);
  gameBoard.classList.toggle("trio-board", trio);

  pauseBtn.textContent = "Pausar";
}

/* =========================================
   TIMER
========================================= */

function startTimer() {
  stopTimer();

  if (MODE_TIMES[currentMode] === null) {
    if (!isTrioMode()) {
      timerEl.textContent = "∞";
    }
    return;
  }

  timerInterval = setInterval(() => {
    if (gamePaused) return;

    timer--;
    updateHUD();

    if (timer <= 0) {
      finishGame(false);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

/* =========================================
   BOARD
========================================= */

function getCardsForCurrentMode() {
  return isTrioMode()
    ? [...baseImages, ...trioExtraCards]
    : [...baseImages];
}

function createBoard() {
  gameBoard.innerHTML = "";

  const sourceCards = getCardsForCurrentMode();
  totalPairs = sourceCards.length;
  deck = [...sourceCards, ...sourceCards];

  shuffle(deck);

  deck.forEach(item => {
    const card = createCard(item);
    gameBoard.appendChild(card);
  });
}

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = data.name;
  card.setAttribute("tabindex", "0");

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-front">
        <img src="${data.src}" alt="${data.label}">
        <div class="card-label">${data.label}</div>
      </div>
      <div class="card-face card-back">
        <img src="${backImage}" alt="Carta">
      </div>
    </div>
  `;

  card.addEventListener("click", () => flipCard(card));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipCard(card);
    }
  });

  return card;
}

/* =========================================
   JOGO
========================================= */

function resetGameState() {
  stopTimer();
  lockBoard = false;
  gamePaused = false;
  firstCard = null;
  secondCard = null;
  moves = 0;
  matches = 0;
  trioScores = [0, 0, 0];
  trioTurnIndex = 0;
  timer = MODE_TIMES[currentMode];
}

function startGame(mode) {
  currentMode = mode;
  currentMusicKey = isTrioMode() ? "trio" : mode;

  resetGameState();
  configureLayout();
  updateHUD();
  createBoard();
  updateHUD();

  showScreen(gameScreen);
  startTimer();
  showTutorial();
}

function showTutorial() {
  overlay.classList.remove("hidden");
  gamePaused = true;

  if (isTrioMode()) {
    overlayTitle.textContent = "Modo Trio";
    overlayText.textContent = "Vamos competir";
  }
  else if (currentMode === "easy") {
    overlayTitle.textContent = "Modo Fácil";
    overlayText.textContent = "Treine sua memória com calma.";
  }
  else if (currentMode === "medium") {
    overlayTitle.textContent = "Modo Médio";
    overlayText.textContent = "Você tem 60 segundos. Prepare-se para acelerar.";
  }
  else {
    overlayTitle.textContent = "Modo Difícil";
    overlayText.textContent = "30 segundos. Seja rápido e certeiro.";
  }

  overlayBtn.textContent = "Começar";
}

function flipCard(card) {
  if (lockBoard || gamePaused) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched") || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;
  moves++;

  if (!isTrioMode()) {
    updateHUD();
  }

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches++;

    if (isTrioMode()) {
      trioScores[trioTurnIndex]++;
    }

    updateHUD();
    resetTurn();

    if (matches === totalPairs) {
      finishGame(true);
    }

    return;
  }

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    if (isTrioMode()) {
      advanceTrioTurn();
    }

    resetTurn();
    updateHUD();
  }, 900);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function advanceTrioTurn() {
  trioTurnIndex = (trioTurnIndex + 1) % trioPlayers.length;
}

/* =========================================
   RANKING
========================================= */

function saveRanking(victory) {
  if (!victory || isTrioMode()) return;

  const key = `ranking_${currentMode}`;
  let ranking = JSON.parse(localStorage.getItem(key)) || [];

  ranking.push({
    name: playerName,
    moves,
    time: currentMode === "easy" ? 9999 : timer,
    date: new Date().toLocaleDateString()
  });

  ranking.sort((a, b) => {
    if (a.moves !== b.moves) return a.moves - b.moves;
    return b.time - a.time;
  });

  ranking = ranking.slice(0, 100);
  localStorage.setItem(key, JSON.stringify(ranking));
}

function loadRanking(mode) {
  const key = `ranking_${mode}`;
  const ranking = JSON.parse(localStorage.getItem(key)) || [];

  rankingList.innerHTML = "";

  if (ranking.length === 0) {
    rankingList.innerHTML = "<p>Nenhum jogador ainda.</p>";
    return;
  }

  ranking.forEach((player, index) => {
    const div = document.createElement("div");
    div.classList.add("rank-item");
    div.innerHTML = `
      <span>#${index + 1} - ${player.name}</span>
      <span>${player.moves} movimentos</span>
      <span>${mode === "easy" ? "Sem tempo" : player.time + "s"}</span>
      <span>${player.date}</span>
    `;
    rankingList.appendChild(div);
  });
}

/* =========================================
   CONFETE
========================================= */

function createConfetti() {
  const colors = ["#ff0", "#f0f", "#0ff", "#0f0", "#f00", "#00f"];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

/* =========================================
   RESULTADO FINAL
========================================= */

function buildTrioPodium() {
  trioPodium.innerHTML = "";

  const sorted = trioPlayers
    .map((name, index) => ({ name, pairs: trioScores[index], index }))
    .sort((a, b) => {
      if (b.pairs !== a.pairs) return b.pairs - a.pairs;
      return a.index - b.index;
    });

  const visualOrder = [1, 0, 2];

  visualOrder.forEach(positionIndex => {
    const player = sorted[positionIndex];
    const place = positionIndex + 1;

    const card = document.createElement("div");
    card.className = `podium-step place-${place}`;
    card.innerHTML = `
      <span class="podium-rank">${place}º</span>
      <h3>${player.name}</h3>
      <p class="podium-score">${player.pairs} pares</p>
      <p>${place === 1 ? "Grande vencedor" : place === 2 ? "Vice-campeão" : "Terceiro lugar"}</p>
    `;

    trioPodium.appendChild(card);
  });
}

function finishGame(victory) {
  stopTimer();
  stopAllMusic();

  if (victory) {
    sounds.win.currentTime = 0;
    safePlay(sounds.win);
    createConfetti();
  }
  else {
    sounds.lose.currentTime = 0;
    safePlay(sounds.lose);
  }

  saveRanking(victory);

  if (isTrioMode()) {
    finalTitle.textContent = "Pódio Final";
    soloResult.classList.add("hidden");
    trioResult.classList.remove("hidden");
    goRankingBtn.classList.add("hidden");
    buildTrioPodium();
  }
  else {
    finalTitle.textContent = victory ? "Vitória" : "Tempo Esgotado";
    soloResult.classList.remove("hidden");
    trioResult.classList.add("hidden");
    goRankingBtn.classList.remove("hidden");
    finalTime.textContent = currentMode === "easy" ? "Sem tempo" : timerEl.textContent;
    finalMoves.textContent = moves;
    finalMode.textContent = getModeLabel(currentMode);
  }

  overlay.classList.add("hidden");
  showScreen(gameOverScreen);
}

/* =========================================
   NAVEGAÇÃO
========================================= */

function openRankingFromMenu() {
  rankingFromGameOver = false;
  rankingHomeBtn.classList.add("hidden");

  rankTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.rank === "easy");
  });

  loadRanking("easy");
  showScreen(rankingScreen);
}

function returnToIntro() {
  stopTimer();
  stopAllMusic();
  ensureMenuMusic();
  overlay.classList.add("hidden");
  pauseBtn.textContent = "Pausar";
  showScreen(introScreen);
}

playBtn.addEventListener("click", () => {
  unlockAudio();
  ensureMenuMusic();
  showScreen(modeScreen);
});

rulesBtn.addEventListener("click", () => {
  ensureMenuMusic();
  showScreen(rulesScreen);
});

rankingBtn.addEventListener("click", () => {
  ensureMenuMusic();
  openRankingFromMenu();
});

soloModeBtn.addEventListener("click", () => {
  currentGameType = "solo";
  playerNameInput.value = playerName;
  showScreen(soloNameScreen);
});

trioModeBtn.addEventListener("click", () => {
  currentGameType = "trio";
  showScreen(trioNameScreen);
});

backButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.back;

    if (target === "intro") {
      showScreen(introScreen);
      ensureMenuMusic();
    }
    else if (target === "mode") {
      showScreen(modeScreen);
      ensureMenuMusic();
    }
    else if (target === "solo-name") {
      showScreen(soloNameScreen);
      ensureMenuMusic();
    }
  });
});

soloContinueBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();

  if (name.length < 2) {
    alert("Digite um nome válido");
    return;
  }

  playerName = name;
  currentGameType = "solo";

  sounds.confirm.currentTime = 0;
  safePlay(sounds.confirm);

  showScreen(difficultyScreen);
});

trioContinueBtn.addEventListener("click", () => {
  const names = trioNameInputs.map(input => input.value.trim());
  const invalidName = names.some(name => name.length < 2);
  const normalized = names.map(name => name.toLowerCase());
  const hasDuplicate = new Set(normalized).size !== normalized.length;

  if (invalidName) {
    alert("Digite os 3 nomes corretamente");
    return;
  }

  if (hasDuplicate) {
    alert("Use nomes diferentes para os 3 jogadores");
    return;
  }

  trioPlayers = names;
  currentGameType = "trio";

  sounds.confirm.currentTime = 0;
  safePlay(sounds.confirm);

  startGame("trio");
});

difficultyButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentGameType = "solo";
    startGame(button.dataset.mode);
  });
});

/* =========================================
   OVERLAY E PAUSA
========================================= */

overlayBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");

  if (gamePaused) {
    gamePaused = false;
    pauseBtn.textContent = "Pausar";
    playMusic(currentMusicKey);
  }
});

pauseBtn.addEventListener("click", () => {
  gamePaused = !gamePaused;

  if (gamePaused) {
    sounds[currentMusicKey]?.pause();
    overlayTitle.textContent = "Pausado";
    overlayText.textContent = "Clique para continuar.";
    overlayBtn.textContent = "Continuar";
    pauseBtn.textContent = "Continuar";
    overlay.classList.remove("hidden");
    return;
  }

  pauseBtn.textContent = "Pausar";
  overlay.classList.add("hidden");
  safePlay(sounds[currentMusicKey]);
});

/* =========================================
   CONTROLES DO JOGO
========================================= */

resetBtn.addEventListener("click", () => {
  startGame(currentMode);
});

homeBtn.addEventListener("click", () => {
  returnToIntro();
});

/* =========================================
   GAME OVER
========================================= */

retryBtn.addEventListener("click", () => {
  startGame(currentMode);
});

goRankingBtn.addEventListener("click", () => {
  if (isTrioMode()) return;

  rankingFromGameOver = true;
  rankingHomeBtn.classList.remove("hidden");

  rankTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.rank === currentMode);
  });

  loadRanking(currentMode);
  showScreen(rankingScreen);
});

goHomeBtn.addEventListener("click", () => {
  returnToIntro();
});

/* =========================================
   RANKING
========================================= */

rankingBackBtn.addEventListener("click", () => {
  if (rankingFromGameOver) {
    showScreen(gameOverScreen);
    return;
  }

  showScreen(introScreen);
});

rankingHomeBtn.addEventListener("click", () => {
  returnToIntro();
});

rankTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    rankTabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    loadRanking(tab.dataset.rank);
  });
});

rankingTitle.addEventListener("click", () => {
  clearRankingClicks++;

  if (clearRankingClicks >= 10) {
    localStorage.removeItem("ranking_easy");
    localStorage.removeItem("ranking_medium");
    localStorage.removeItem("ranking_extreme");
    rankingList.innerHTML = "<p>Ranking limpo.</p>";
    clearRankingClicks = 0;
  }
});

/* =========================================
   START
========================================= */

showScreen(introScreen);

window.addEventListener("click", () => {
  if (!audioUnlocked) {
    unlockAudio();
    ensureMenuMusic();
  }
}, { once: true });
