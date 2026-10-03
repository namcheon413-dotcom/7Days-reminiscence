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


let initialized = false;


/* ========================================
   INITIALIZE
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }

  initialized = true;


  /* 사용자 입력 직후 오디오 재생 */

  playTitleBgm();
  playClickSound();


  /* INITIALIZE 화면 숨기기 */

  initializeScreen.classList.remove(
    "active"
  );


  /* 실제 타이틀 표시 */

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


    /* 중복 클릭 방지 */

    startButton.disabled = true;


    /* START 문구 변경 */

    startButton.textContent =
      "CONNECTING...";


    /* 타이틀 전체 페이드 아웃 */

    titleScreen.style.transition =
      "opacity 0.7s ease";

    titleScreen.style.opacity =
      "0";


    /* 페이드 종료 후 로비 표시 */

    setTimeout(() => {

      titleScreen.style.display =
        "none";

      lobbyScreen.classList.add(
        "active"
      );

    }, 700);

  }
);
