/* =========================================
   CONSTANTES
========================================= */

const sounds = {
  menu: new Audio("audio/Music.mp3"),
  easy: new Audio("audio/Facil.mp3"),
  medium: new Audio("audio/Medium.mp3"),
  extreme: new Audio("audio/Hard.mp3"),
  trio: new Audio("audio/Batuque.mp3"),
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

/* 
  AQUI você pode colocar as 7 imagens novas do trio.
  Basta trocar os nomes, labels e os arquivos src se quiser.
*/
const trioExtraCards = [
  { name: "Personagem Trio 1", src: "img/trio-extra-1.png", label: "Personagem Trio 1" },
  { name: "Personagem Trio 2", src: "img/trio-extra-2.png", label: "Personagem Trio 2" },
  { name: "Personagem Trio 3", src: "img/trio-extra-3.png", label: "Personagem Trio 3" },
  { name: "Personagem Trio 4", src: "img/trio-extra-4.png", label: "Personagem Trio 4" },
  { name: "Personagem Trio 5", src: "img/trio-extra-5.png", label: "Personagem Trio 5" },
  { name: "Personagem Trio 6", src: "img/trio-extra-6.png", label: "Personagem Trio 6" },
  { name: "Personagem Trio 7", src: "img/trio-extra-7.png", label: "Personagem Trio 7" }
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
  currentMusicKey = mode === "trio" ? "trio" : mode;

  resetGameState();
  configureLayout();
  updateHUD();
  createBoard();
  updateHUD();

  showScreen(gameScreen);

  if (mode === "trio") {
    playMusic("trio");
  }

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
  else if (currentMode ===
