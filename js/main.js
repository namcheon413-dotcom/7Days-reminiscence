const initializeScreen =
  document.getElementById("initialize-screen");

const mainTitle =
  document.getElementById("main-title");

const startButton =
  document.getElementById("start-button");


let initialized = false;


/* ========================================
   INITIALIZE
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }

  initialized = true;


  // 사용자 입력 직후 오디오 재생
  playTitleBgm();
  playClickSound();


  // INITIALIZE 화면 숨기기
  initializeScreen.classList.remove("active");


  // 약간의 간격 후 실제 타이틀 표시
  setTimeout(() => {

    mainTitle.classList.add("active");

  }, 350);

}


/* 화면 클릭 */

initializeScreen.addEventListener(
  "click",
  initializeGame
);


/* ========================================
   START
======================================== */

startButton.addEventListener(
  "click",
  function () {

    playClickSound();

    startButton.textContent =
      "CONNECTING...";


    /*
      다음 단계에서
      여기에 로비 전환을 연결한다.
    */

  }
);
