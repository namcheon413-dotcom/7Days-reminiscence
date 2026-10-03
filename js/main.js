/* ========================================
   七曜回顧錄
   MAIN CONTROLLER
======================================== */


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


/* GACHA */

const gachaBanner =
  document.getElementById("gacha-banner");

const gachaScreen =
  document.getElementById("gacha-screen");

const gachaBackButton =
  document.getElementById("gacha-back-button");

const eventGachaTab =
  document.getElementById("event-gacha-tab");

const standardGachaTab =
  document.getElementById("standard-gacha-tab");

const eventRecruitment =
  document.getElementById("event-recruitment");

const standardRecruitment =
  document.getElementById("standard-recruitment");

const recruitButtons =
  document.querySelectorAll(".recruit-button");


/* ========================================
   STATE
======================================== */

let initialized = false;
let transitioning = false;


/* ========================================
   AUDIO
======================================== */

function safeClickSound() {

  try {

    if (typeof playClickSound === "function") {
      playClickSound();
    }

  } catch (error) {

    console.warn(
      "Click sound failed:",
      error
    );

  }

}


function safeTitleBgm() {

  try {

    if (typeof playTitleBgm === "function") {
      playTitleBgm();
    }

  } catch (error) {

    console.warn(
      "Title BGM failed:",
      error
    );

  }

}


/* ========================================
   GENERIC SCREEN TRANSITION

   현재 화면
   ↓ fade out
   잠깐 빈 화면
   ↓
   다음 화면 fade in
======================================== */

function changeGameScreen(
  fromScreen,
  toScreen,
  delay = 300
) {

  if (
    transitioning ||
    !fromScreen ||
    !toScreen
  ) {
    return;
  }

  transitioning = true;


  /* 현재 화면 OUT */

  fromScreen.classList.remove(
    "active"
  );


  setTimeout(
    function () {

      /*
        기존 화면은 전환이 끝난 뒤
        완전히 치워둔다.
      */

      fromScreen.style.display =
        "none";


      /*
        다음 화면을 먼저 DOM에 복구.
        아직 active가 없으므로
        opacity: 0 상태.
      */

      toScreen.style.display =
        "block";


      /*
        브라우저가 opacity:0을
        한 번 렌더한 뒤 active 추가.

        그래야 fade-in transition이
        확실하게 발생한다.
      */

      requestAnimationFrame(
        function () {

          requestAnimationFrame(
            function () {

              toScreen.classList.add(
                "active"
              );

              transitioning = false;

            }
          );

        }
      );

    },
    delay
  );

}


/* ========================================
   INITIALIZE
   CLICK TO INITIALIZE → MAIN TITLE
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }

  if (
    !initializeScreen ||
    !mainTitle
  ) {
    return;
  }

  initialized = true;


  safeTitleBgm();
  safeClickSound();


  /*
    index.html에 이전 임시 onclick이
    남아 있어서 display:none이 된 경우도
    그대로 정상 진행 가능.
  */

  initializeScreen.classList.remove(
    "active"
  );


  setTimeout(
    function () {

      mainTitle.classList.add(
        "active"
      );

    },
    350
  );

}


/* INITIALIZE CLICK */

if (initializeScreen) {

  initializeScreen.addEventListener(
    "click",
    initializeGame
  );

}


/* ========================================
   START → LOBBY

   TITLE OUT
   ↓
   LOBBY IN
======================================== */

if (
  startButton &&
  titleScreen &&
  lobbyScreen
) {

  startButton.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }

      transitioning = true;

      safeClickSound();


      /*
        중복 클릭 방지
      */

      startButton.disabled = true;


      /*
        타이틀 UI부터 페이드 아웃
      */

      if (mainTitle) {

        mainTitle.classList.remove(
          "active"
        );

      }


      /*
        title-screen 전체 페이드 아웃
      */

      titleScreen.classList.add(
        "screen-out"
      );


      /*
        0.7초 후 로비 표시
      */

      setTimeout(
        function () {

          titleScreen.style.display =
            "none";


          lobbyScreen.style.display =
            "block";


          /*
            로비는 먼저 opacity:0 상태로
            렌더한 뒤 active를 붙인다.
          */

          lobbyScreen.classList.remove(
            "active"
          );


          requestAnimationFrame(
            function () {

              requestAnimationFrame(
                function () {

                  lobbyScreen.classList.add(
                    "active"
                  );

                  transitioning = false;

                }
              );

            }
          );

        },
        700
      );

    }
  );

}


/* ========================================
   GACHA
   EVENT / STANDARD SWITCH
======================================== */

function showRecruitment(type) {

  if (
    !eventGachaTab ||
    !standardGachaTab ||
    !eventRecruitment ||
    !standardRecruitment
  ) {

    return;

  }


  eventGachaTab.classList.remove(
    "active"
  );

  standardGachaTab.classList.remove(
    "active"
  );

  eventRecruitment.classList.remove(
    "active"
  );

  standardRecruitment.classList.remove(
    "active"
  );


  /* STANDARD */

  if (type === "standard") {

    standardGachaTab.classList.add(
      "active"
    );

    standardRecruitment.classList.add(
      "active"
    );

    return;

  }


  /* EVENT */

  eventGachaTab.classList.add(
    "active"
  );

  eventRecruitment.classList.add(
    "active"
  );

}


/* ========================================
   LOBBY → GACHA

   신규 요원 모집 클릭
======================================== */

if (
  gachaBanner &&
  lobbyScreen &&
  gachaScreen
) {

  gachaBanner.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }


      safeClickSound();


      /*
        모집 페이지 진입 시
        이벤트 모집을 기본 선택
      */

      showRecruitment(
        "event"
      );


      /*
        로비 → 모집
      */

      changeGameScreen(
        lobbyScreen,
        gachaScreen,
        300
      );

    }
  );

}


/* ========================================
   GACHA → LOBBY

   BACK
======================================== */

if (
  gachaBackButton &&
  gachaScreen &&
  lobbyScreen
) {

  gachaBackButton.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }


      safeClickSound();


      /*
        모집 → 로비
      */

      changeGameScreen(
        gachaScreen,
        lobbyScreen,
        300
      );

    }
  );

}


/* ========================================
   EVENT TAB
======================================== */

if (eventGachaTab) {

  eventGachaTab.addEventListener(
    "click",
    function () {

      safeClickSound();

      showRecruitment(
        "event"
      );

    }
  );

}


/* ========================================
   STANDARD TAB
======================================== */

if (standardGachaTab) {

  standardGachaTab.addEventListener(
    "click",
    function () {

      safeClickSound();

      showRecruitment(
        "standard"
      );

    }
  );

}


/* ========================================
   RECRUIT BUTTONS
======================================== */

recruitButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        safeClickSound();


        const recruitType =
          button.dataset.recruitType;


        const recruitCount =
          Number(
            button.dataset.recruitCount
          );


        /*
          아직 실제 모집 로직은 미구현.
          현재는 테스트 출력.
        */

        console.log(
          "RECRUIT:",
          recruitType,
          recruitCount
        );

      }
    );

  }
);


/* ========================================
   INITIAL SCREEN STATE
======================================== */

/*
  로비 / 모집 화면은 처음에
  display 자체를 제거해 둔다.

  이후 화면 전환 시 JS에서
  display:block → active 순으로 복구.
*/

if (lobbyScreen) {

  lobbyScreen.classList.remove(
    "active"
  );

  lobbyScreen.style.display =
    "none";

}


if (gachaScreen) {

  gachaScreen.classList.remove(
    "active"
  );

  gachaScreen.style.display =
    "none";

}


/* 가챠 기본 선택 */

showRecruitment(
  "event"
);
