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

    startButton.disabled = true;

    startButton.textContent =
      "CONNECTING...";


    setTimeout(() => {

      /* 타이틀 완전히 숨김 */
      titleScreen.style.display = "none";


      /* 로비 완전히 표시 */
      lobbyScreen.style.display = "block";
      lobbyScreen.style.opacity = "1";
      lobbyScreen.style.visibility = "visible";

      lobbyScreen.classList.add("active");

    }, 500);

  }
);
