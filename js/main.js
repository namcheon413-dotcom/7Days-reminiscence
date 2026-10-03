/* ========================================
   ELEMENTS
======================================== */
const initializeScreen = document.getElementById("initialize-screen");
const mainTitle = document.getElementById("main-title");
const startButton = document.getElementById("start-button");
const titleScreen = document.getElementById("title-screen");
const lobbyScreen = document.getElementById("lobby-screen");
const gachaBanner = document.getElementById("gacha-banner");
const gachaScreen = document.getElementById("gacha-screen");
const gachaBackButton = document.getElementById("gacha-back-button");

const eventGachaTab = document.getElementById("event-gacha-tab");
const standardGachaTab = document.getElementById("standard-gacha-tab");
const eventRecruitment = document.getElementById("event-recruitment");
const standardRecruitment = document.getElementById("standard-recruitment");
const recruitButtons = document.querySelectorAll(".recruit-button");

let initialized = false;

function initializeGame() {
  if (initialized) return;
  initialized = true;
  playTitleBgm();
  playClickSound();
  initializeScreen.classList.remove("active");
  setTimeout(() => mainTitle.classList.add("active"), 350);
}

initializeScreen.addEventListener("click", initializeGame);

startButton.addEventListener("click", function () {
  playClickSound();
  startButton.disabled = true;
  startButton.textContent = "CONNECTING...";
  setTimeout(() => {
    titleScreen.style.display = "none";
    lobbyScreen.style.display = "block";
    lobbyScreen.classList.add("active");
  }, 500);
});

function showRecruitment(type) {
  eventGachaTab.classList.remove("active");
  standardGachaTab.classList.remove("active");
  eventRecruitment.classList.remove("active");
  standardRecruitment.classList.remove("active");

  if (type === "standard") {
    standardGachaTab.classList.add("active");
    standardRecruitment.classList.add("active");
  } else {
    eventGachaTab.classList.add("active");
    eventRecruitment.classList.add("active");
  }
}

gachaBanner.addEventListener("click", function () {
  playClickSound();
  showRecruitment("event");
  lobbyScreen.classList.remove("active");
  setTimeout(() => {
    lobbyScreen.style.display = "none";
    gachaScreen.style.display = "block";
    gachaScreen.classList.add("active");
  }, 300);
});

gachaBackButton.addEventListener("click", function () {
  playClickSound();
  gachaScreen.classList.remove("active");
  setTimeout(() => {
    gachaScreen.style.display = "none";
    lobbyScreen.style.display = "block";
    lobbyScreen.classList.add("active");
  }, 300);
});

eventGachaTab.addEventListener("click", function () {
  playClickSound();
  showRecruitment("event");
});

standardGachaTab.addEventListener("click", function () {
  playClickSound();
  showRecruitment("standard");
});

recruitButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    playClickSound();
    const recruitType = button.dataset.recruitType;
    const recruitCount = Number(button.dataset.recruitCount);
    console.log("RECRUIT:", recruitType, recruitCount);
  });
});

showRecruitment("event");
