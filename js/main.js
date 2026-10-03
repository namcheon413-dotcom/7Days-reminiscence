/* ========================================
   ELEMENTS
======================================== */

const initializeScreen =
  document.getElementById("initialize-screen");

const mainTitle =
  document.getElementById("main-title");

const startButton =
  document.getElementById("start-button");

const titleScreen =
  document.getElementById("title-screen");

const lobbyScreen =
  document.getElementById("lobby-screen");

const gachaBanner =
  document.getElementById("gacha-banner");

const gachaScreen =
  document.getElementById("gacha-screen");

const gachaBackButton =
  document.getElementById("gacha-back-button");


let initialized = false;


/* ========================================
   INITIALIZE
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }

  initialized = true;


  /* 오디오 시작 */

  playTitleBgm();
  playClickSound();


  /* INITIALIZE 화면 숨기기 */

  initializeScreen.classList.remove(
    "active"
  );


  /* 메인 타이틀 표시 */

  setTimeout(() => {

    mainTitle.classList.add(
      "active"
    );

  }, 350);

}


/* ========================================
   INITIALIZE CLICK
======================================== */

initializeScreen.addEventListener(
  "click",
  initializeGame
);


/* ========================================
   START → LOBBY
======================================== */

startButton.addEventListener(
  "click",
  function () {

    playClickSound();


    startButton.disabled = true;

    startButton.textContent =
      "CONNECTING...";


    setTimeout(() => {

      /* 타이틀 숨김 */

      titleScreen.style.display =
        "none";


      /* 로비 표시 */

      lobbyScreen.style.display =
        "block";

      lobbyScreen.classList.add(
        "active"
      );

    }, 500);

  }
);


/* ========================================
   LOBBY → GACHA
======================================== */

gachaBanner.addEventListener(
  "click",
  function () {

    playClickSound();


    lobbyScreen.classList.remove(
      "active"
    );


    setTimeout(() => {

      lobbyScreen.style.display =
        "none";

      gachaScreen.style.display =
        "block";

      gachaScreen.classList.add(
        "active"
      );

    }, 300);

  }
);


/* ========================================
   GACHA → LOBBY
======================================== */

gachaBackButton.addEventListener(
  "click",
  function () {

    playClickSound();


    gachaScreen.classList.remove(
      "active"
    );


    setTimeout(() => {

      gachaScreen.style.display =
        "none";

      lobbyScreen.style.display =
        "block";

      lobbyScreen.classList.add(
        "active"
      );

    }, 300);

  }
);
