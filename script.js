/* =========================================
   ÁUDIO
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

Object.values(sounds).forEach(sound => {
  sound.preload = "auto";
});

/* =========================================
   DADOS DAS CARTAS
========================================= */

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

function createSvgPlaceholder(label, color1, color2) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" rx="36" fill="url(#g)" />
      <circle cx="300" cy="220" r="100" fill="rgba(255,255,255,0.18)" />
      <rect x="150" y="350" width="300" height="80" rx="18" fill="rgba(255,255,255,0.16)" />
      <text x="300" y="520" text-anchor="middle" font-size="34" font-family="Arial" fill="white" font-weight="700">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/* 
  Trio já vem com placeholders inline.
  Se você quiser usar imagens reais, depois é só trocar o src.
*/
const trioExtraCards = [
  { name: "Personagem Trio 1", src: createSvgPlaceholder("Trio 1", "#ff6b6b", "#8e44ad"), label: "Personagem Trio 1" },
  { name: "Personagem Trio 2", src: createSvgPlaceholder("Trio 2", "#00c9a7", "#005f73"), label: "Personagem Trio 2" },
  { name: "Personagem Trio 3", src: createSvgPlaceholder("Trio 3", "#ffd166", "#ef476f"), label: "Personagem Trio 3" },
  { name: "Personagem Trio 4", src: createSvgPlaceholder("Trio 4", "#06d6a0", "#118ab2"), label: "Personagem Trio 4" },
  { name: "Personagem Trio 5", src: createSvgPlaceholder("Trio 5", "#f72585", "#3a0ca3"), label: "Personagem Trio 5" },
  { name: "Personagem Trio 6", src: createSvgPlaceholder("Trio 6", "#90be6d", "#277da1"), label: "Personagem Trio 6" },
  { name: "Personagem Trio 7", src: createSvgPlaceholder("Trio 7", "#f9844a", "#f94144"), label: "Personagem Trio 7" }
];

const backImage = "img/trofeu.webp";

const MODE_TIMES = {
  easy: null,
  medium: 60,
  extreme: 30,
  trio: null
};

const RANKING_KEY = "copa_dos_mascotes_ranking_v2";

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

const screenMap = {
  intro: introScreen,
  rules: rulesScreen,
  mode: modeScreen,
  "solo-name": soloNameScreen,
  "trio-name": trioNameScreen,
  difficulty: difficultyScreen,
  ranking: rankingScreen,
  game: gameScreen,
  "game-over": gameOverScreen
};

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

const rankingBackBtn = document.getElementById("rankingBackBtn");
const rankingHomeBtn = document.getElementById("rankingHomeBtn");

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

let timer = null;
let elapsedSeconds = 0;
let timerInterval = null;
let gamePaused = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;
let totalPairs = 0;
let deck = [];
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

function goToScreenByKey(key) {
  if (screenMap[key]) {
    showScreen(screenMap[key]);
  }
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

function normalizeName(value) {
  return value.trim().replace(/\s+/g, " ");
}

/* =========================================
   ÁUDIO
========================================= */

function stopAllMusic() {
  Object.values(sounds).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
  });
}

function playMusic(type) {
  stopAllMusic();

  const sound = sounds[type];
  if (!sound) return;

  sound.loop = true;
  sound.volume = 0.45;
  safePlay(sound);
}

function playEffect(type) {
  stopAllMusic();

  const sound = sounds[type];
  if (!sound) return;

  sound.loop = false;
  sound.volume = 0.6;
  safePlay(sound);
}

function ensureMenuMusic() {
  if (!audioUnlocked) return;
  playMusic("menu");
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

  ensureMenuMusic();
}

document.addEventListener("pointerdown", unlockAudio, { once: true });
document.addEventListener("keydown", unlockAudio, { once: true });

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

  playerHud.textContent = playerName || "---";
  timerEl.textContent = MODE_TIMES[currentMode] === null
    ? `∞`
    : formatTime(timer);
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
   OVERLAY
========================================= */

function showOverlay(title, text, buttonText = "Continuar") {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlayBtn.textContent = buttonText;
  overlay.classList.remove("hidden");
  gamePaused = true;
}

function hideOverlay() {
  overlay.classList.add("hidden");
  gamePaused = false;
  pauseBtn.textContent = "Pausar";
}

/* =========================================
   TIMER
========================================= */

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function startTimer() {
  stopTimer();

  if (isTrioMode()) {
    return;
  }

  updateHUD();

  timerInterval = setInterval(() => {
    if (gamePaused) return;

    elapsedSeconds++;

    if (MODE_TIMES[currentMode] !== null) {
      timer--;
      if (timer <= 0) {
        timer = 0;
        updateHUD();
        finishGame(false);
        return;
      }
    }

    updateHUD();
  }, 1000);
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

function resetRoundSelection() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

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
  elapsedSeconds = 0;
  overlay.classList.add("hidden");
}

function showTutorial() {
  if (isTrioMode()) {
    showOverlay(
      "Modo Trio",
      "3 jogadores se revezam. Quando errar, a vez passa para o próximo. Quem fizer mais pares vence.",
      "Começar"
    );
    return;
  }

  if (currentMode === "easy") {
    showOverlay(
      "Modo Fácil",
      "Você tem tempo ilimitado. Boa sorte!",
      "Começar"
    );
    return;
  }

  if (currentMode === "medium") {
    showOverlay(
      "Modo Médio",
      "Você tem 1 minuto para encontrar todos os pares.",
      "Começar"
    );
    return;
  }

  showOverlay(
    "Modo Difícil",
    "Você tem apenas 30 segundos. Seja rápido!",
    "Começar"
  );
}

function startGame(mode) {
  currentMode = mode;
  currentMusicKey = mode === "trio" ? "trio" : mode;

  resetGameState();
  configureLayout();
  createBoard();
  updateHUD();
  showScreen(gameScreen);

  playMusic(currentMusicKey);
  showTutorial();
  startTimer();
}

function flipCard(card) {
  if (gamePaused) return;
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  updateHUD();
  checkForMatch();
}

function checkForMatch() {
  if (!firstCard || !secondCard) return;

  const matched = firstCard.dataset.name === secondCard.dataset.name;

  if (matched) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

function handleMatch() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matches++;

  if (isTrioMode()) {
    trioScores[trioTurnIndex]++;
  }

  updateHUD();
  resetRoundSelection();

  if (matches === totalPairs) {
    finishGame(true);
  }
}

function handleMismatch() {
  lockBoard = true;

  const first = firstCard;
  const second = secondCard;

  setTimeout(() => {
    first.classList.remove("flipped");
    second.classList.remove("flipped");

    if (isTrioMode()) {
      trioTurnIndex = (trioTurnIndex + 1) % trioPlayers.length;
    }

    updateHUD();
    resetRoundSelection();
  }, 850);
}

function getSoloResultTimeText() {
  return formatTime(elapsedSeconds);
}

function getRankingData() {
  const raw = localStorage.getItem(RANKING_KEY);

  if (!raw) {
    return {
      easy: [],
      medium: [],
      extreme: []
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      easy: parsed.easy || [],
      medium: parsed.medium || [],
      extreme: parsed.extreme || []
    };
  } catch {
    return {
      easy: [],
      medium: [],
      extreme: []
    };
  }
}

function saveRankingData(data) {
  localStorage.setItem(RANKING_KEY, JSON.stringify(data));
}

function saveCurrentPlayerToRanking() {
  if (isTrioMode()) return;
  if (!["easy", "medium", "extreme"].includes(currentMode)) return;

  const ranking = getRankingData();

  ranking[currentMode].push({
    name: playerName,
    time: elapsedSeconds,
    moves,
    mode: currentMode,
    date: new Date().toLocaleDateString("pt-BR")
